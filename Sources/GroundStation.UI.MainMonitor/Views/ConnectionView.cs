using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class ConnectionView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;
    private readonly IObsSettingRepository _obsSettingRepository;
    private readonly IObsRepository _obsRepository;
    private readonly ILogRepository _logRepository;
    private readonly IMobileRepository _mobileRepository;

    public ConnectionView(
        IFlightModuleReceiverRepository flightModuleReceiverRepository,
        ISensingModuleReceiverRepository sensingModuleReceiverRepository,
        IObsSettingRepository obsSettingRepository,
        IObsRepository obsRepository,
        ILogRepository logRepository,
        IMobileRepository mobileRepository
    )
    {
        _flightModuleReceiverRepository = flightModuleReceiverRepository;
        _sensingModuleReceiverRepository = sensingModuleReceiverRepository;
        _obsSettingRepository = obsSettingRepository;
        _obsRepository = obsRepository;
        _logRepository = logRepository;
        _mobileRepository = mobileRepository;
    }

    public event EventHandler<NavigationRequestEventArgs>? NavigationRequest;

    public void OnNavigated()
    {
        if (_flightModuleReceiverRepository.PortName is not null)
        {
            _flightModuleReceiverRepository.Start();
        }
        
        if (_sensingModuleReceiverRepository.PortName is not null)
        {
            _sensingModuleReceiverRepository.Start();
        }
    }

    public void Render()
    {
        Console.SetCursorPosition(0, 0);
        Console.Clear();


        Console.SetCursorPosition(3, 0);
        Console.Write("CONNECTION");
        
        
        Console.SetCursorPosition(1, 2);
        Console.Write("FLIGHT MODULE  -");

        Console.ForegroundColor = ConnectionStatusToColor(_flightModuleReceiverRepository.CurrentStatus);
        Console.SetCursorPosition(18, 2);
        Console.Write(_flightModuleReceiverRepository.CurrentStatusString);
        Console.ResetColor();

        if (_flightModuleReceiverRepository.CurrentStatus == IReceiver.Status.Connected)
        {
            Console.SetCursorPosition(0, 3);
            Console.Write(_flightModuleReceiverRepository.ReceivedCount);
            Console.Write(" RECEIVED    RSSI ");
            Console.Write(_flightModuleReceiverRepository.LatestData?.PacketDataPart.RSSI);
            Console.Write("    SNR ");
            Console.Write(_flightModuleReceiverRepository.LatestData?.PacketDataPart.SNR.ToString("F1"));
        }
        
        
        Console.SetCursorPosition(1, 5);
        Console.Write("SENSING MODULE -");
        
        Console.ForegroundColor = ConnectionStatusToColor(_sensingModuleReceiverRepository.CurrentStatus);
        Console.SetCursorPosition(18, 5);
        Console.Write(_sensingModuleReceiverRepository.CurrentStatusString);
        Console.ResetColor();
        
        if (_sensingModuleReceiverRepository.CurrentStatus == IReceiver.Status.Connected)
        {
            Console.SetCursorPosition(0, 6);
            Console.Write(_sensingModuleReceiverRepository.ReceivedCount);
            Console.Write(" RECEIVED    RSSI ");
            Console.Write(_sensingModuleReceiverRepository.LatestData?.PacketDataPart.RSSI);
            Console.Write("    SNR ");
            Console.Write(_sensingModuleReceiverRepository.LatestData?.PacketDataPart.SNR.ToString("F1"));
        }
        
        
        Console.SetCursorPosition(0, 12);
        Console.Write("[<] PREV");

        Console.SetCursorPosition(0, 13);
        Console.Write("[>] NEXT");
        
        
        if (!Console.KeyAvailable)
        {
            return;
        }

        var readKey = Console.ReadKey(true);
        switch (readKey.Key)
        {
            case ConsoleKey.LeftArrow:
                if (_flightModuleReceiverRepository.PortName is not null)
                {
                    _flightModuleReceiverRepository.Stop();
                }
        
                if (_sensingModuleReceiverRepository.PortName is not null)
                {
                    _sensingModuleReceiverRepository.Stop();
                }
                
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new MobileSettingView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository, _logRepository, _mobileRepository)));
                Console.Clear();
                break;
            case ConsoleKey.RightArrow:
                NavigationRequest?.Invoke(this,
                    new NavigationRequestEventArgs(new SummaryView(_flightModuleReceiverRepository,
                        _sensingModuleReceiverRepository, _obsSettingRepository, _obsRepository, _logRepository, _mobileRepository)));
                Console.Clear();
                break;
        }
    }

    private ConsoleColor ConnectionStatusToColor(IReceiver.Status status)
    {
        return status switch
        {
            IReceiver.Status.NotSelected => ConsoleColor.Gray,
            IReceiver.Status.Selected => ConsoleColor.Black,
            IReceiver.Status.ConnectionFailed => ConsoleColor.Red,
            IReceiver.Status.WaitingPacket => ConsoleColor.Cyan,
            IReceiver.Status.InvalidPacket => ConsoleColor.Red,
            IReceiver.Status.Connected => ConsoleColor.Green,
            _ => ConsoleColor.Black
        };
    }
}
