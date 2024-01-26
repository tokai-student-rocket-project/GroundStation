using System.Reactive.Concurrency;
using GroundStation.Domain.Entities;
using GroundStation.Domain.Repositories;

namespace GroundStation.Infrastructure.FileSystem;

public class LogFile : ILogRepository
{
    public bool UseLogger { get; set; } = false;
    public bool IsPerformance { get; set; } = false;
    public bool IsFlight { get; set; } = false;
    public string LogName { get; private set; } = "";
    
    public void ScheduleLog()
    {
        LogName = DateTime.Now.ToString("");
    }

    public void SaveLog(FlightData? flightData, SensingData? sensingData)
    {
        if (!UseLogger)
        {
            return;
        }
         
        
        if (flightData is not null)
        {
            if (!File.Exists(FlightModuleLogFilePath))
            {
                Directory.CreateDirectory(FlightModuleLogFolderPath);
                File.AppendAllText(FlightModuleLogFilePath, $"packet_ident,packet_uptime_s,packet_rssi_dBm,packet_snr_dBm,logger_doLogging,logger_usage,logger_number,flight_mode,flight_time_s,flight_detection_valveModeIsLaunch,flight_detection_flightPinIsOpen,flight_detection_isFalling,flight_separation_sn3IsOn,flight_separation_sn4IsOn,gnss_fixType,gnss_satellites,gnss_latitude_deg,gnss_longitude_deg,gnss_height_m,gnss_speed_mps,gnss_accuracy_m,valve_motorTemperature_degC,valve_mcuTemperature_degC,valve_inputVoltage_V,valve_currentPosition_deg,valve_targetPosition_deg\n");
            }

            var packet = flightData.PacketDataPart;
            var logger = flightData.LoggerDataPart;
            var flight = flightData.FlightDataPart;
            var gnss = flightData.GnssDataPart;
            var valve = flightData.ValveDataPart;
            
            File.AppendAllText(FlightModuleLogFilePath, $"{packet.Ident},{packet.Uptime},{packet.RSSI},{packet.SNR},{logger.DoLogging},{logger.Usage},{logger.Number},{flight.Mode},{flight.Time},{flight.ValveModeIsLaunch},{flight.FlightPinIsOpen},{flight.IsFalling},{flight.SN3IsOn},{flight.SN4IsOn},{gnss.FixType},{gnss.Satellites},{gnss.Latitude},{gnss.Longitude},{gnss.Height},{gnss.Speed},{gnss.Accuracy},{valve.MotorTemperature},{valve.McuTemperature},{valve.InputVoltage},{valve.CurrentPosition},{valve.TargetPosition}\n");
        }
        
        if (sensingData is not null)
        {
            if (!File.Exists(SensingModuleLogFilePath))
            {
                Directory.CreateDirectory(SensingModuleLogFolderPath);
                File.AppendAllText(SensingModuleLogFilePath, $"packet_ident,packet_uptime_s,packet_rssi_dBm,packet_snr_dBm,logger_doLogging,logger_usage,logger_number,dynamics_acceleration_mps2_norm,dynamics_acceleration_mps2_x,dynamics_acceleration_mps2_y,dynamics_acceleration_mps2_z,dynamics_orientation_deg_roll,dynamics_orientation_deg_pitch,dynamics_orientation_deg_yaw,dynamics_forceX_N,dynamics_jerkX_mps3,trajectory_altitude_m,trajectory_verticalSpeed_mps,trajectory_apogee_m,trajectory_estimated_s,electrical_voltage_V_ground,electrical_voltage_V_battery,electrical_voltage_V_tie,electrical_voltage_V_bus,electrical_current_mA_ground,electrical_current_mA_battery,electrical_current_mA_tie,electrical_current_mA_bus,electrical_power_W_ground,electrical_power_W_battery,electrical_power_W_tie,electrical_power_W_bus,thermal_temperature_degC_regulator1,thermal_temperature_degC_regulator2,thermal_temperature_degC_regulator3_thermal_temperature_degC_conduction,thermal_temperature_degC_outside,thermal_temperature_degC_inside,thermal_temperature_degC_ventPort,thermal_temperature_degC_tankAtmosphere,sutegoma_uptime_s,sutegoma_taskRate_Hz\n");
            }
            
            var packet = sensingData.PacketDataPart;
            var logger = sensingData.LoggerDataPart;
            var dynamics = sensingData.DynamicsDataPart;
            var trajectory = sensingData.TrajectoryDataPart;
            var electrical = sensingData.ElectricalDataPart;
            var thermal = sensingData.ThermalDataPart;
            var sutegoma = sensingData.SutegomaDataPart;
            
            File.AppendAllText(SensingModuleLogFilePath, $"{packet.Ident},{packet.Uptime},{packet.RSSI},{packet.SNR},{logger.DoLogging},{logger.Usage},{logger.Number},{dynamics.AccelerationNorm},{dynamics.AccelerationX},{dynamics.AccelerationY},{dynamics.AccelerationZ},{dynamics.OrientationRoll},{dynamics.OrientationPitch},{dynamics.OrientationYaw},{dynamics.Force},{dynamics.Jerk},{trajectory.Altitude},{trajectory.VerticalSpeed},{trajectory.Apogee},{trajectory.Estimated},{electrical.GroundVoltage},{electrical.BatteryVoltage},{electrical.TieVoltage},{electrical.BusVoltage},{electrical.GroundCurrent},{electrical.BatteryCurrent},{electrical.TieCurrent},{electrical.BusCurrent},{electrical.GroundPower},{electrical.BatteryPower},{electrical.TiePower},{electrical.BusPower},{thermal.Regulator1Temperature},{thermal.Regulator2Temperature},{thermal.Regulator3Temperature},{thermal.ConductionTemperature},{thermal.OutsideTemperature},{thermal.InsideTemperature},{thermal.VentPortTemperature},{thermal.TankAtmosphereTemperature},{sutegoma.Uptime},{sutegoma.TaskRate}\n");
        }
    }

    private string FlightModuleLogFolderPath => $"./Log/{(IsPerformance ? "Performance" : "Temporary")}/{(IsFlight ? "Flight" : "Ground")}/{LogName}";
    private string FlightModuleLogFilePath => $"{FlightModuleLogFolderPath}/FlightModule.csv";

    private string SensingModuleLogFolderPath =>
        $"./Log/{(IsPerformance ? "Performance" : "Temporary")}/{(IsFlight ? "Flight" : "Ground")}/{LogName}";
    private string SensingModuleLogFilePath => $"{SensingModuleLogFolderPath}/SensingModule.csv";
}
