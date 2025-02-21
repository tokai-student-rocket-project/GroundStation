using System.Text;
using GroundStation.Domain.Repositories;
using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public class SummaryView : IView
{
    private readonly IFlightModuleReceiverRepository _flightModuleReceiverRepository;
    private readonly ISensingModuleReceiverRepository _sensingModuleReceiverRepository;
    private readonly IObsSettingRepository _obsSettingRepository;
    private readonly IObsRepository _obsRepository;
    private readonly ILogRepository _logRepository;
    private readonly IMobileRepository _mobileRepository;

    public SummaryView(
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
    }

    public void Render()
    {
        Console.SetCursorPosition(0, 0);
        Console.Clear();

        Console.ForegroundColor = ConsoleColor.Cyan;
        // 1列ロゴ表示
        //Console.WriteLine("SUBARU v1.2  == GROUND STATION ==");

        // ロゴ表示
        Console.WriteLine("   ___ _   _ ___   _   ___ _   _ ");
        Console.WriteLine("  / __| | | | _ ) /_\\ | _ \\ | | | ");
        Console.WriteLine("  \\__ \\ |_| | _ \\/ _ \\|   / |_| |");
        Console.WriteLine("  |___/\\___/|___/_/ \\_\\_|_\\\\___/  v1.2  Tokai Student Rocket Project");
        Console.WriteLine();
        Console.ResetColor();

        Console.ForegroundColor = ConsoleColor.Red;
        Console.WriteLine($"  FLIGHT MODULE");
        Console.ResetColor();
        Console.WriteLine($" FM {_flightModuleReceiverRepository.LatestData?.PacketDataPart.Ident ?? "UNAVAILABLE"}    {_flightModuleReceiverRepository.LatestData?.PacketDataPart.UptimeString ?? "N/A"} s    {_flightModuleReceiverRepository.LatestData?.PacketDataPart.RSSIString ?? "N/A"} dBm    {_flightModuleReceiverRepository.LatestData?.PacketDataPart.SNRString ?? "N/A"} dBm");
        Console.WriteLine($"     LOG {_flightModuleReceiverRepository.LatestData?.LoggerDataPart.DoLoggingString ?? "N/A"}    {_flightModuleReceiverRepository.LatestData?.LoggerDataPart.NumberString ?? "N/A"}    {_flightModuleReceiverRepository.LatestData?.LoggerDataPart.UsageString ?? "N/A"}% USING");
        Console.WriteLine();
        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine($"  SENSING MODULE");
        Console.ResetColor();
        Console.WriteLine($" SM {_sensingModuleReceiverRepository.LatestData?.PacketDataPart.Ident ?? "UNAVAILABLE"}    {_sensingModuleReceiverRepository.LatestData?.PacketDataPart.UptimeString ?? "N/A"} s    {_sensingModuleReceiverRepository.LatestData?.PacketDataPart.RSSIString ?? "N/A"} dBm    {_sensingModuleReceiverRepository.LatestData?.PacketDataPart.SNRString ?? "N/A"} dBm");
        Console.WriteLine($"     LOG {_sensingModuleReceiverRepository.LatestData?.LoggerDataPart.DoLoggingString ?? "N/A"}    {_sensingModuleReceiverRepository.LatestData?.LoggerDataPart.NumberString ?? "N/A"}    {_sensingModuleReceiverRepository.LatestData?.LoggerDataPart.UsageString ?? "N/A"}% USING");

        Console.WriteLine();

        Console.WriteLine($" X +  {_flightModuleReceiverRepository.LatestData?.FlightDataPart.TimeString ?? "N/A"} s");

        Console.WriteLine();

        Console.WriteLine($" ACC    {_sensingModuleReceiverRepository.LatestData?.DynamicsDataPart.AccelerationNormString ?? "N/A"} m/s^2");
        Console.WriteLine($" ATT    YAW  {_sensingModuleReceiverRepository.LatestData?.DynamicsDataPart.OrientationYawString ?? "N/A"} °    PITCH  {_sensingModuleReceiverRepository.LatestData?.DynamicsDataPart.OrientationPitchString ?? "N/A"} °    ROLL  {_sensingModuleReceiverRepository.LatestData?.DynamicsDataPart.OrientationRollString ?? "N/A"} °");
        Console.WriteLine($" ALT    {_sensingModuleReceiverRepository.LatestData?.TrajectoryDataPart.AltitudeString ?? "N/A"} m    {(_flightModuleReceiverRepository.LatestData?.FlightDataPart.IsFalling ?? false ? "DN" : "UP")}  {_sensingModuleReceiverRepository.LatestData?.TrajectoryDataPart.VerticalSpeedString ?? "N/A"} m/s");
        Console.WriteLine($" APG    {_sensingModuleReceiverRepository.LatestData?.TrajectoryDataPart.ApogeeString ?? "N/A"} m    ESTIMATED  {_sensingModuleReceiverRepository.LatestData?.TrajectoryDataPart.EstimatedString ?? "N/A"} s");

        Console.WriteLine();

        Console.WriteLine($" FLIGHT MODE    {_flightModuleReceiverRepository.LatestData?.FlightDataPart.ModeString ?? "N/A"}");
        Console.WriteLine($" FLIGHTPIN    {_flightModuleReceiverRepository.LatestData?.FlightDataPart.FlightPinStateString ?? "N/A"}");
        Console.WriteLine($" SEPARATOR    SN3  {_flightModuleReceiverRepository.LatestData?.FlightDataPart.SN3StateString ?? "N/A"}    SN4  {_flightModuleReceiverRepository.LatestData?.FlightDataPart.SN4StateString ?? "N/A"}");

        Console.WriteLine();

        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine("  GNSS");
        Console.ResetColor();
        Console.WriteLine($" SATS   {_flightModuleReceiverRepository.LatestData?.GnssDataPart.SatellitesString ?? "N/A"}    {_flightModuleReceiverRepository.LatestData?.GnssDataPart.FixTypeString ?? "N/A"}");
        Console.WriteLine($" TIME   {_flightModuleReceiverRepository.LatestData?.GnssDataPart.TimeString ?? "N/A"}");
        Console.WriteLine($" POS    {_flightModuleReceiverRepository.LatestData?.GnssDataPart.LatitudeString ?? "N/A"}   {_flightModuleReceiverRepository.LatestData?.GnssDataPart.LongitudeString ?? "N/A"}");
        //Console.WriteLine($"ALT    {_flightModuleReceiverRepository.LatestData?.GnssDataPart.HeightString ?? "N/A"} m");
        //Console.WriteLine($"SPD    {_flightModuleReceiverRepository.LatestData?.GnssDataPart.SpeedString ?? "N/A"} m/s");
        Console.WriteLine($" ACC    {_flightModuleReceiverRepository.LatestData?.GnssDataPart.AccuracyString ?? "N/A"} m");

        Console.WriteLine();

        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine("  VALVE");
        Console.ResetColor();
        Console.WriteLine($" MODE    {_flightModuleReceiverRepository.LatestData?.FlightDataPart.ValveModeString ?? "N/A"}");
        Console.ForegroundColor = ConsoleColor.Magenta;
        Console.Write($"  MAIN");
        Console.ResetColor();
        Console.ForegroundColor = ConsoleColor.Yellow;
        Console.WriteLine($"                SUPPLY");
        Console.ResetColor();
        Console.WriteLine($" ANGL    {_flightModuleReceiverRepository.LatestData?.ValveDataPart.TargetPositionString ?? "N/A"}° > {_flightModuleReceiverRepository.LatestData?.ValveDataPart.CurrentPositionString ?? "N/A"}°          { _flightModuleReceiverRepository.LatestData?.ValveDataPart.CurrentSupplyPositionString ?? "N/A"} °");
        //Console.WriteLine($" DC      {_flightModuleReceiverRepository.LatestData?.ValveDataPart.InputVoltageString ?? "N/A"} V");
        Console.WriteLine($" DC      {_flightModuleReceiverRepository.LatestData?.ValveDataPart.InputVoltageString ?? "N/A"} V                {_flightModuleReceiverRepository.LatestData?.ValveDataPart.VoltageString ?? "N/A"} V");



        Console.WriteLine();

        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine("  ELECTRICAL");
        Console.ResetColor();
        Console.WriteLine($" GND    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.GroundVoltageString ?? "N/A"} V    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.GroundCurrentString ?? "N/A"} mA    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.GroundPowerString ?? "N/A"} W");
        Console.WriteLine($" BAT    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.BatteryVoltageString ?? "N/A"} V    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.BatteryCurrentString ?? "N/A"} mA    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.BatteryPowerString ?? "N/A"} W");
        Console.WriteLine($" BUS    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.BusVoltageString ?? "N/A"} V    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.BusCurrentString ?? "N/A"} mA    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.BusPowerString ?? "N/A"} W");

        Console.WriteLine();

        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine("  THERMAL");
        Console.ResetColor();
        Console.WriteLine($" MAT TEMP    REG1  {_sensingModuleReceiverRepository.LatestData?.ThermalDataPart.Regulator1TemperatureString ?? "N/A"} ℃    REG2  {_sensingModuleReceiverRepository.LatestData?.ThermalDataPart.Regulator2TemperatureString ?? "N/A"} ℃    REG3  {_sensingModuleReceiverRepository.LatestData?.ThermalDataPart.Regulator3TemperatureString ?? "N/A"} ℃    COND  {_sensingModuleReceiverRepository.LatestData?.ThermalDataPart.ConductionTemperatureString ?? "N/A"} ℃");
        Console.WriteLine($" AIR TEMP    OUT  {_sensingModuleReceiverRepository.LatestData?.ThermalDataPart.OutsideTemperatureString ?? "N/A"} ℃    AVIO  {_sensingModuleReceiverRepository.LatestData?.ThermalDataPart.InsideTemperatureString ?? "N/A"} ℃");
        // TANK  {_sensingModuleReceiverRepository.LatestData?.ThermalDataPart.TankAtmosphereTemperatureString ?? "N/A"} ℃" // SUTEGOMAいないのでコメントアウト
        //Console.WriteLine($" VENT PORT    {_sensingModuleReceiverRepository.LatestData?.ThermalDataPart.VentPortTemperatureString ?? "N/A"} ℃");　// SUTEGOMAいないのでコメントアウト

        Console.WriteLine();

        //Console.WriteLine(" SUTEGOMA");
        //Console.WriteLine($"UPTIME    {_sensingModuleReceiverRepository.LatestData?.SutegomaDataPart.UptimeString ?? "N/A"} s");
        //Console.WriteLine($"TASKRATE    {_sensingModuleReceiverRepository.LatestData?.SutegomaDataPart.TaskRateString ?? "N/A"} Hz");

        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine("  TIMER");
        Console.ResetColor();
        Console.WriteLine($" PSEP1  {_flightModuleReceiverRepository.LatestData?.TimerDataPart.Separation1ProtectionTimeString ?? "N/A"} s    FSEP1  {_flightModuleReceiverRepository.LatestData?.TimerDataPart.Separation1ForceTimeString ?? "N/A"} s    PSEP2  {_flightModuleReceiverRepository.LatestData?.TimerDataPart.Separation2ProtectionTimeString ?? "N/A"} s    FSEP2  {_flightModuleReceiverRepository.LatestData?.TimerDataPart.Separation2ForceTimeString ?? "N/A"} s    LAND  {_flightModuleReceiverRepository.LatestData?.TimerDataPart.LandingTimeString ?? "N/A"} s");

        _obsRepository.SendData(_flightModuleReceiverRepository.LatestData, _sensingModuleReceiverRepository.LatestData);
        _logRepository.SaveLog(_flightModuleReceiverRepository.LatestData, _sensingModuleReceiverRepository.LatestData);
        _mobileRepository.SendData(_flightModuleReceiverRepository.LatestData, _sensingModuleReceiverRepository.LatestData);

        Console.WriteLine();

        Console.Write($" [F] FLIGHT MODE ON   /");
        Console.Write($"    [R] RESET   /");
        Console.WriteLine($"    [C] SEND CONFIG");




        if (!Console.KeyAvailable)
        {
            return;
        }

        var readKey = Console.ReadKey(true);
        switch (readKey.Key)
        {
            case ConsoleKey.F:
                _flightModuleReceiverRepository.SendFlightModeOnCommand();
                break;

            case ConsoleKey.R:
                _flightModuleReceiverRepository.SendFlightModeResetCommand();
                break;

            case ConsoleKey.C:
                _flightModuleReceiverRepository.SendTimerConfig();
                break;
            case ConsoleKey.LeftArrow:
                Console.Clear();
                break;
        }
    }
}


