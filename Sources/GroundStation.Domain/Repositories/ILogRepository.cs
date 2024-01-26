using GroundStation.Domain.Entities;

namespace GroundStation.Domain.Repositories;

public interface ILogRepository
{ bool UseLogger { get; set; }
     bool IsPerformance { get; set; }
     bool IsFlight { get; set; }
    string LogName { get; }
    void ScheduleLog();
    void SaveLog(FlightData? flightData, SensingData? sensingData);
}
