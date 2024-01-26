using System.Timers;
using GroundStation.Infrastructure;
using GroundStation.UI.MainMonitor.Events;
using GroundStation.UI.MainMonitor.Views;
using Timer = System.Timers.Timer;

namespace GroundStation.UI.MainMonitor;

public static class Program
{
    private static IView? s_currentView;

    public static void Main(string[] args)
    {
        Console.Clear();
        Console.CursorVisible = false;

        var timer = new Timer(50);
        timer.Elapsed += Refresh;
        timer.Start();

        Navigate(new InitialView(Factories.CreateFlightModuleReceiverRepository(),
            Factories.CreateSensingModuleReceiverRepository(), Factories.CreateObsSettingRepository(), Factories.CreateObsRepository()));

        while (true)
        {
        }
    }

    private static void Navigate(IView view)
    {
        if (s_currentView is not null)
        {
            s_currentView.NavigationRequest -= OnNavigationRequested;
        }

        s_currentView = view;
        s_currentView.NavigationRequest += OnNavigationRequested;
        s_currentView.OnNavigated();
    }

    private static void OnNavigationRequested(object? sender, NavigationRequestEventArgs args)
    {
        Navigate(args.View);
    }

    private static void Refresh(object? sender, ElapsedEventArgs e)
    {
        s_currentView?.Render();
    }
}
