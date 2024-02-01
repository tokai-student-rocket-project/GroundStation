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

    public SummaryView(
        IFlightModuleReceiverRepository flightModuleReceiverRepository,
        ISensingModuleReceiverRepository sensingModuleReceiverRepository,
        IObsSettingRepository obsSettingRepository,
        IObsRepository obsRepository,
        ILogRepository logRepository
    )
    {
        _flightModuleReceiverRepository = flightModuleReceiverRepository;
        _sensingModuleReceiverRepository = sensingModuleReceiverRepository;
        _obsSettingRepository = obsSettingRepository;
        _obsRepository = obsRepository;
        _logRepository = logRepository;
    }

    public event EventHandler<NavigationRequestEventArgs>? NavigationRequest;

    public void OnNavigated()
    {
    }

    public void Render()
    {
        Console.Clear();
        
        
        Console.WriteLine($"FM {_flightModuleReceiverRepository.LatestData?.PacketDataPart.Ident}    {_flightModuleReceiverRepository.LatestData?.PacketDataPart.UptimeString} s    {_flightModuleReceiverRepository.LatestData?.PacketDataPart.RSSIString} dBm    {_flightModuleReceiverRepository.LatestData?.PacketDataPart.SNRString} dBm");
        Console.WriteLine($"    LOG {_flightModuleReceiverRepository.LatestData?.LoggerDataPart.DoLoggingString}    {_flightModuleReceiverRepository.LatestData?.LoggerDataPart.NumberString}    {_flightModuleReceiverRepository.LatestData?.LoggerDataPart.UsageString}% USING");
        Console.WriteLine();
        Console.WriteLine($"SM {_sensingModuleReceiverRepository.LatestData?.PacketDataPart.Ident}    {_sensingModuleReceiverRepository.LatestData?.PacketDataPart.UptimeString} s    {_sensingModuleReceiverRepository.LatestData?.PacketDataPart.RSSIString} dBm    {_sensingModuleReceiverRepository.LatestData?.PacketDataPart.SNRString} dBm");
        Console.WriteLine($"    LOG {_sensingModuleReceiverRepository.LatestData?.LoggerDataPart.DoLoggingString}    {_sensingModuleReceiverRepository.LatestData?.LoggerDataPart.NumberString}    {_sensingModuleReceiverRepository.LatestData?.LoggerDataPart.UsageString}% USING");
        
        Console.WriteLine();
        
        Console.WriteLine($"X +  {_flightModuleReceiverRepository.LatestData?.FlightDataPart.TimeString} s");
        
        Console.WriteLine();
        
        Console.WriteLine($"ACC    {_sensingModuleReceiverRepository.LatestData?.DynamicsDataPart.AccelerationNormString} m/s^2");
        Console.WriteLine($"ATT    YAW  {_sensingModuleReceiverRepository.LatestData?.DynamicsDataPart.OrientationYawString} °    PITCH  {_sensingModuleReceiverRepository.LatestData?.DynamicsDataPart.OrientationPitchString} °    ROLL  {_sensingModuleReceiverRepository.LatestData?.DynamicsDataPart.OrientationRollString} °");
        Console.WriteLine($"ALT    {_sensingModuleReceiverRepository.LatestData?.TrajectoryDataPart.AltitudeString} m    {(_flightModuleReceiverRepository.LatestData?.FlightDataPart.IsFalling ?? false ?  "DN" : "UP")}  {_sensingModuleReceiverRepository.LatestData?.TrajectoryDataPart.VerticalSpeedString} m/s");
        Console.WriteLine($"APG    {_sensingModuleReceiverRepository.LatestData?.TrajectoryDataPart.ApogeeString} m    ESTIMATED  {_sensingModuleReceiverRepository.LatestData?.TrajectoryDataPart.EstimatedString} s");
        
        Console.WriteLine();
        
        Console.WriteLine($"FLIGHT MODE    {_flightModuleReceiverRepository.LatestData?.FlightDataPart.ModeString}");
        Console.WriteLine($"FLIGHTPIN    {_flightModuleReceiverRepository.LatestData?.FlightDataPart.FlightPinStateString}");
        Console.WriteLine($"SEPARATOR    SN3  {_flightModuleReceiverRepository.LatestData?.FlightDataPart.SN3StateString}    SN4  {_flightModuleReceiverRepository.LatestData?.FlightDataPart.SN4StateString}");
        
        Console.WriteLine();
        
        Console.WriteLine(" GNSS");
        Console.WriteLine($"SATS   {_flightModuleReceiverRepository.LatestData?.GnssDataPart.SatellitesString}    {_flightModuleReceiverRepository.LatestData?.GnssDataPart.FixTypeString}");
        Console.WriteLine($"TIME   {_flightModuleReceiverRepository.LatestData?.GnssDataPart.TimeString}");
        Console.WriteLine($"POS    {_flightModuleReceiverRepository.LatestData?.GnssDataPart.LatitudeString}   {_flightModuleReceiverRepository.LatestData?.GnssDataPart.LongitudeString}");
        Console.WriteLine($"ALT    {_flightModuleReceiverRepository.LatestData?.GnssDataPart.HeightString} m");
        Console.WriteLine($"SPD    {_flightModuleReceiverRepository.LatestData?.GnssDataPart.SpeedString} m/s");
        Console.WriteLine($"ACC    {_flightModuleReceiverRepository.LatestData?.GnssDataPart.AccuracyString} m");
        
        Console.WriteLine();
        
        Console.WriteLine(" VALVE");
        Console.WriteLine($"MODE    {_flightModuleReceiverRepository.LatestData?.FlightDataPart.ValveModeString}");
        Console.WriteLine($"ANGL    {_flightModuleReceiverRepository.LatestData?.ValveDataPart.TargetPositionString}° > {_flightModuleReceiverRepository.LatestData?.ValveDataPart.CurrentPositionString}°");
        Console.WriteLine($"TEMP    {_flightModuleReceiverRepository.LatestData?.ValveDataPart.MotorTemperatureString}°");
        
        Console.WriteLine();
        
        Console.WriteLine(" ELECTRICAL");
        Console.WriteLine($"GND    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.GroundVoltageString} V    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.GroundCurrentString} mA    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.GroundPowerString} W");
        Console.WriteLine($"BAT    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.BatteryVoltageString} V    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.BatteryCurrentString} mA    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.BatteryPowerString} W");
        Console.WriteLine($"BUS    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.BusVoltageString} V    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.BusCurrentString} mA    {_sensingModuleReceiverRepository.LatestData?.ElectricalDataPart.BusPowerString} W");

        Console.WriteLine();
        
        Console.WriteLine(" THERMAL");
        Console.WriteLine($"MAT TEMP    REG1  {_sensingModuleReceiverRepository.LatestData?.ThermalDataPart.Regulator1TemperatureString} ℃    REG2  {_sensingModuleReceiverRepository.LatestData?.ThermalDataPart.Regulator2TemperatureString} ℃    REG3  {_sensingModuleReceiverRepository.LatestData?.ThermalDataPart.Regulator3TemperatureString} ℃    COND  {_sensingModuleReceiverRepository.LatestData?.ThermalDataPart.ConductionTemperatureString} ℃");
        Console.WriteLine($"AIR TEMP    OUT  {_sensingModuleReceiverRepository.LatestData?.ThermalDataPart.OutsideTemperatureString} ℃    AVIO  {_sensingModuleReceiverRepository.LatestData?.ThermalDataPart.InsideTemperatureString} ℃    TANK  {_sensingModuleReceiverRepository.LatestData?.ThermalDataPart.TankAtmosphereTemperatureString} ℃");
        Console.WriteLine($"VENT PORT    {_sensingModuleReceiverRepository.LatestData?.ThermalDataPart.VentPortTemperatureString} ℃");
        
        Console.WriteLine();
        
        Console.WriteLine(" SUTEGOMA");
        Console.WriteLine($"UPTIME    {_sensingModuleReceiverRepository.LatestData?.SutegomaDataPart.UptimeString} s");
        Console.WriteLine($"TASKRATE    {_sensingModuleReceiverRepository.LatestData?.SutegomaDataPart.TaskRateString} Hz");
        
        _obsRepository.SendData(_flightModuleReceiverRepository.LatestData, _sensingModuleReceiverRepository.LatestData);
        _logRepository.SaveLog(_flightModuleReceiverRepository.LatestData, _sensingModuleReceiverRepository.LatestData);
        

        if (!Console.KeyAvailable)
        {
            return;
        }

        Console.ReadKey(true);
    }
}
