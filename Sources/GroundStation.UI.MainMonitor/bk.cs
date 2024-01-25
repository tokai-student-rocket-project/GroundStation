// using System.IO.Ports;
//
// var ports = SerialPort.GetPortNames();
//
// var index = 0;
// foreach (var portIterator in ports)
// {
//     Console.WriteLine($"[{index}] {portIterator}");
//     index++;
// }
//
// Console.Write("Port Index > ");
// var selectedIndex = Console.ReadLine();
//
// var port = new SerialPort(ports[int.Parse(selectedIndex!)], 115200);
//
// port.DataReceived += (sender, e) => { Console.WriteLine((sender as SerialPort)?.ReadExisting()); };
//
// port.Open();
//
// Console.WriteLine("Press any key to close...");
// Console.WriteLine();
// Console.ReadKey();
// port.Close();


