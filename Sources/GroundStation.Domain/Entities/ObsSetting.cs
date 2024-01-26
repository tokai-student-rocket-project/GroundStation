namespace GroundStation.Domain.Entities;

public class ObsSetting
{
    public ObsSetting(string address, string port, string password)
    {
        Address = address;
        Port = port;
        Password = password;
    }
    
    public string Address { get; }
    public string Port { get; }
    public string Password { get; }
    public string URL => $"ws://{Address}:{Port}";
}
