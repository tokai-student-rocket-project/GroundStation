using System.Diagnostics;
using GroundStation.Domain.Entities;
using GroundStation.Domain.Repositories;
using Newtonsoft.Json.Linq;
using OBSWebsocketDotNet;

namespace GroundStation.Infrastructure.WebSocket;

public class Obs : IObsRepository
{
    public bool UseObs { get; set; } = false;
    private OBSWebsocket _obs = new OBSWebsocket();
    public bool IsConnected => _obs.IsConnected;

    public void Connect(ObsSetting setting)
    {
        if (_obs.IsConnected)
        {
            return;
        }
        
        _obs.ConnectAsync(setting.URL, setting.Password);
    }
    
    public void DisConnect()
    {
        if (!_obs.IsConnected)
        {
            return;
        }
        
        _obs.Disconnect();
    }

    public void SendData(FlightData? flightData, SensingData? sensingData)
    {
        if (!_obs.IsConnected)
        {
            return;
        }
        

        if (flightData is not null)
        {
            // _obs.SetInputSettings("gs_f_packet_rssi", JObject.Parse("{ \"text\":\"" + flightData.PacketDataPart.RSSIString + "\" }"));
            // _obs.SetInputSettings("gs_f_packet_snr", JObject.Parse("{ \"text\":\"" + flightData.PacketDataPart.SNRString + "\" }"));
            // _obs.SetInputSettings("gs_f_packet_ident", JObject.Parse("{ \"text\":\"" + flightData.PacketDataPart.Ident + "\" }"));            
            // _obs.SetInputSettings("gs_f_packet_uptime", JObject.Parse("{ \"text\":\"" + flightData.PacketDataPart.UptimeString + "\" }"));
            //
            // _obs.SetInputSettings("gs_f_logger_doLogging", JObject.Parse("{ \"text\":\"" + flightData.LoggerDataPart.DoLoggingString + "\" }"));
            // _obs.SetInputSettings("gs_f_logger_usage", JObject.Parse("{ \"text\":\"" + flightData.LoggerDataPart.UsageString + "\" }"));
            // _obs.SetInputSettings("gs_f_logger_number", JObject.Parse("{ \"text\":\"" + flightData.LoggerDataPart.NumberString + "\" }"));
            // //
            // _obs.SetInputSettings("gs_flight_mode", JObject.Parse("{ \"text\":\"" + flightData.FlightDataPart.ModeString + "\" }"));
            // _obs.SetInputSettings("gs_flight_time", JObject.Parse("{ \"text\":\"" + flightData.FlightDataPart.TimeString + "\" }"));
            // _obs.SetInputSettings("gs_flight_valveMode", JObject.Parse("{ \"text\":\"" + flightData.FlightDataPart.ValveModeString + "\" }"));
            // _obs.SetInputSettings("gs_flight_flightPinState", JObject.Parse("{ \"text\":\"" + flightData.FlightDataPart.FlightPinStateString + "\" }"));
            // _obs.SetInputSettings("gs_flight_isFalling", JObject.Parse("{ \"text\":\"" + flightData.FlightDataPart.IsFallingString + "\" }"));
            // _obs.SetInputSettings("gs_flight_sn3State", JObject.Parse("{ \"text\":\"" + flightData.FlightDataPart.SN3StateString + "\" }"));
            // _obs.SetInputSettings("gs_flight_sn3State", JObject.Parse("{ \"text\":\"" + flightData.FlightDataPart.SN4StateString + "\" }"));
            // //
            // _obs.SetInputSettings("gs_gnss_fixType", JObject.Parse("{ \"text\":\"" + flightData.GnssDataPart.FixTypeString + "\" }"));
            // _obs.SetInputSettings("gs_gnss_satellites", JObject.Parse("{ \"text\":\"" + flightData.GnssDataPart.SatellitesString + "\" }"));
            // _obs.SetInputSettings("gs_gnss_latitude", JObject.Parse("{ \"text\":\"" + flightData.GnssDataPart.LatitudeString + "\" }"));
            // _obs.SetInputSettings("gs_gnss_longitude", JObject.Parse("{ \"text\":\"" + flightData.GnssDataPart.LongitudeString + "\" }"));
            // _obs.SetInputSettings("gs_gnss_height", JObject.Parse("{ \"text\":\"" + flightData.GnssDataPart.HeightString + "\" }"));
            // _obs.SetInputSettings("gs_gnss_speed", JObject.Parse("{ \"text\":\"" + flightData.GnssDataPart.SpeedString + "\" }"));
            // _obs.SetInputSettings("gs_gnss_accuracy", JObject.Parse("{ \"text\":\"" + flightData.GnssDataPart.AccuracyString + "\" }"));
            //
            // _obs.SetInputSettings("gs_valve_motorTemperature", JObject.Parse("{ \"text\":\"" + flightData.ValveDataPart.MotorTemperatureString + "\" }"));
            // _obs.SetInputSettings("gs_valve_mcuTemperature", JObject.Parse("{ \"text\":\"" + flightData.ValveDataPart.McuTemperatureString + "\" }"));
            // _obs.SetInputSettings("gs_valve_inputVoltage", JObject.Parse("{ \"text\":\"" + flightData.ValveDataPart.InputVoltageString + "\" }"));
            // _obs.SetInputSettings("gs_valve_currentPosition", JObject.Parse("{ \"text\":\"" + flightData.ValveDataPart.CurrentPositionString + "\" }"));
            // _obs.SetInputSettings("gs_valve_targetPosition", JObject.Parse("{ \"text\":\"" + flightData.ValveDataPart.TargetPositionString + "\" }"));
            
        }

        if (sensingData is not null)
        {
            // _obs.SetInputSettings("gs_s_packet_rssi", JObject.Parse("{ \"text\":\"" + sensingData.PacketDataPart.RSSIString + "\" }"));
            // _obs.SetInputSettings("gs_s_packet_snr", JObject.Parse("{ \"text\":\"" + sensingData.PacketDataPart.SNRString + "\" }"));
            // _obs.SetInputSettings("gs_s_packet_ident", JObject.Parse("{ \"text\":\"" + sensingData.PacketDataPart.Ident + "\" }"));            
            // _obs.SetInputSettings("gs_s_packet_uptime", JObject.Parse("{ \"text\":\"" + sensingData.PacketDataPart.UptimeString + "\" }"));
            //
            // _obs.SetInputSettings("gs_s_logger_doLogging", JObject.Parse("{ \"text\":\"" + sensingData.LoggerDataPart.DoLoggingString + "\" }"));
            // _obs.SetInputSettings("gs_s_logger_usage", JObject.Parse("{ \"text\":\"" + sensingData.LoggerDataPart.UsageString + "\" }"));
            // _obs.SetInputSettings("gs_s_logger_number", JObject.Parse("{ \"text\":\"" + sensingData.LoggerDataPart.NumberString + "\" }"));
            //
            // _obs.SetInputSettings("gs_dynamics_acceleration_norm", JObject.Parse("{ \"text\":\"" + sensingData.DynamicsDataPart.AccelerationNormString + "\" }"));
            // _obs.SetInputSettings("gs_dynamics_acceleration_x", JObject.Parse("{ \"text\":\"" + sensingData.DynamicsDataPart.AccelerationXString + "\" }"));
            // _obs.SetInputSettings("gs_dynamics_acceleration_y", JObject.Parse("{ \"text\":\"" + sensingData.DynamicsDataPart.AccelerationYString + "\" }"));
            // _obs.SetInputSettings("gs_dynamics_acceleration_z", JObject.Parse("{ \"text\":\"" + sensingData.DynamicsDataPart.AccelerationZString + "\" }"));
            // _obs.SetInputSettings("gs_dynamics_orientation_roll", JObject.Parse("{ \"text\":\"" + sensingData.DynamicsDataPart.OrientationRollString + "\" }"));
            // _obs.SetInputSettings("gs_dynamics_orientation_pitch", JObject.Parse("{ \"text\":\"" + sensingData.DynamicsDataPart.OrientationPitchString + "\" }"));
            // _obs.SetInputSettings("gs_dynamics_orientation_yaw", JObject.Parse("{ \"text\":\"" + sensingData.DynamicsDataPart.OrientationYawString + "\" }"));
            // _obs.SetInputSettings("gs_dynamics_force", JObject.Parse("{ \"text\":\"" + sensingData.DynamicsDataPart.ForceString + "\" }"));
            // _obs.SetInputSettings("gs_dynamics_jerk", JObject.Parse("{ \"text\":\"" + sensingData.DynamicsDataPart.JerkString + "\" }"));
            //
            // _obs.SetInputSettings("gs_trajectory_altitude", JObject.Parse("{ \"text\":\"" + sensingData.TrajectoryDataPart.AltitudeString + "\" }"));
            // _obs.SetInputSettings("gs_trajectory_verticalSpeed", JObject.Parse("{ \"text\":\"" + sensingData.TrajectoryDataPart.VerticalSpeedString + "\" }"));
            // _obs.SetInputSettings("gs_trajectory_apogee", JObject.Parse("{ \"text\":\"" + sensingData.TrajectoryDataPart.ApogeeString + "\" }"));
            // _obs.SetInputSettings("gs_trajectory_estimated", JObject.Parse("{ \"text\":\"" + sensingData.TrajectoryDataPart.EstimatedString + "\" }"));
            //
            // _obs.SetInputSettings("gs_electrical_voltage_ground", JObject.Parse("{ \"text\":\"" + sensingData.ElectricalDataPart.GroundVoltageString + "\" }"));
            // _obs.SetInputSettings("gs_electrical_voltage_battery", JObject.Parse("{ \"text\":\"" + sensingData.ElectricalDataPart.BatteryVoltageString + "\" }"));
            // _obs.SetInputSettings("gs_electrical_voltage_tie", JObject.Parse("{ \"text\":\"" + sensingData.ElectricalDataPart.TieVoltageString + "\" }"));
            // _obs.SetInputSettings("gs_electrical_voltage_bus", JObject.Parse("{ \"text\":\"" + sensingData.ElectricalDataPart.BusVoltageString + "\" }"));
            // _obs.SetInputSettings("gs_electrical_current_ground", JObject.Parse("{ \"text\":\"" + sensingData.ElectricalDataPart.GroundCurrentString + "\" }"));
            // _obs.SetInputSettings("gs_electrical_current_battery", JObject.Parse("{ \"text\":\"" + sensingData.ElectricalDataPart.BatteryCurrentString + "\" }"));
            // _obs.SetInputSettings("gs_electrical_current_tie", JObject.Parse("{ \"text\":\"" + sensingData.ElectricalDataPart.TieCurrentString + "\" }"));
            // _obs.SetInputSettings("gs_electrical_current_bus", JObject.Parse("{ \"text\":\"" + sensingData.ElectricalDataPart.BusCurrentString + "\" }"));
            // _obs.SetInputSettings("gs_electrical_power_ground", JObject.Parse("{ \"text\":\"" + sensingData.ElectricalDataPart.GroundPowerString + "\" }"));
            // _obs.SetInputSettings("gs_electrical_power_battery", JObject.Parse("{ \"text\":\"" + sensingData.ElectricalDataPart.BatteryPowerString + "\" }"));
            // _obs.SetInputSettings("gs_electrical_power_tie", JObject.Parse("{ \"text\":\"" + sensingData.ElectricalDataPart.TiePowerString + "\" }"));
            // _obs.SetInputSettings("gs_electrical_power_bus", JObject.Parse("{ \"text\":\"" + sensingData.ElectricalDataPart.BusPowerString + "\" }"));
            //
            // _obs.SetInputSettings("gs_thermal_temperature_regulator1", JObject.Parse("{ \"text\":\"" + sensingData.ThermalDataPart.Regulator1TemperatureString + "\" }"));
            // _obs.SetInputSettings("gs_thermal_temperature_regulator2", JObject.Parse("{ \"text\":\"" + sensingData.ThermalDataPart.Regulator2TemperatureString + "\" }"));
            // _obs.SetInputSettings("gs_thermal_temperature_regulator3", JObject.Parse("{ \"text\":\"" + sensingData.ThermalDataPart.Regulator3TemperatureString + "\" }"));
            // _obs.SetInputSettings("gs_thermal_temperature_conduction", JObject.Parse("{ \"text\":\"" + sensingData.ThermalDataPart.ConductionTemperatureString + "\" }"));
            // _obs.SetInputSettings("gs_thermal_temperature_outside", JObject.Parse("{ \"text\":\"" + sensingData.ThermalDataPart.OutsideTemperatureString + "\" }"));
            // _obs.SetInputSettings("gs_thermal_temperature_inside", JObject.Parse("{ \"text\":\"" + sensingData.ThermalDataPart.InsideTemperatureString + "\" }"));
            // _obs.SetInputSettings("gs_thermal_temperature_ventPort", JObject.Parse("{ \"text\":\"" + sensingData.ThermalDataPart.VentPortTemperatureString + "\" }"));
            // _obs.SetInputSettings("gs_thermal_temperature_tankAtmosphere", JObject.Parse("{ \"text\":\"" + sensingData.ThermalDataPart.TankAtmosphereTemperatureString + "\" }"));
            //
            // _obs.SetInputSettings("gs_sutegoma_uptime", JObject.Parse("{ \"text\":\"" + sensingData.SutegomaDataPart.UptimeString + "\" }"));
            // _obs.SetInputSettings("gs_sutegoma_taskRate", JObject.Parse("{ \"text\":\"" + sensingData.SutegomaDataPart.TaskRateString + "\" }"));
        }
    }
    
}
