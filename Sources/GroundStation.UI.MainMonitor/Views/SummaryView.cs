using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class SummaryView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;

    public SummaryView(
        IFlightModuleReceiverRepository flightModuleReceiverRepository,
        ISensingModuleReceiverRepository sensingModuleReceiverRepository
    )
    {
        _flightModuleReceiverRepository = flightModuleReceiverRepository;
        _sensingModuleReceiverRepository = sensingModuleReceiverRepository;
    }

    public event EventHandler<NavigationRequestEventArgs>? NavigationRequest;

    public void OnNavigated()
    {
    }

    public void Render()
    {
        Console.Clear();
        
        
        Console.SetCursorPosition(3, 0);
        Console.Write("SUMMARY");
        
        
        Console.SetCursorPosition(1, 2);
        Console.Write("GNSS");

        Console.SetCursorPosition(0, 3);
        Console.Write("POS");
        
        Console.SetCursorPosition(7, 3);
        var latDeg = _flightModuleReceiverRepository.LatestData?.GnssDataPart.Latitude ?? 0;
        Console.Write(latDeg.ToString("F0"));
        Console.Write("°");
        var latMinuteSecond = double.Parse("0." + latDeg.ToString("F6").Split(".")[1]) * 60;
        Console.Write(latMinuteSecond.ToString("F0"));
        Console.Write("'");
        Console.Write((double.Parse("0." + latMinuteSecond.ToString("F6").Split(".")[1]) * 60).ToString("F0"));
        Console.Write('"');
        Console.Write("N    ");
        var lonDeg = _flightModuleReceiverRepository.LatestData?.GnssDataPart.Longitude ?? 0;
        Console.Write(lonDeg.ToString("F0"));
        Console.Write("°");
        var lonMinuteSecond = double.Parse("0." + lonDeg.ToString("F6").Split(".")[1]) * 60;
        Console.Write(lonMinuteSecond.ToString("F0"));
        Console.Write("'");
        Console.Write((double.Parse("0." + lonMinuteSecond.ToString("F6").Split(".")[1]) * 60).ToString("F0"));
        Console.Write('"');
        Console.Write('E');
        
        Console.SetCursorPosition(0, 4);
        Console.Write($"ACC    {_flightModuleReceiverRepository.LatestData?.GnssDataPart.Accuracy.ToString("F1") ?? "----"} m");
        

        if (!Console.KeyAvailable)
        {
            return;
        }

        Console.ReadKey(true);
    }
}
