using GroundStation.UI.MainMonitor.Views;

namespace GroundStation.UI.MainMonitor.Events;

public class NavigationRequestEventArgs : EventArgs
{
    public NavigationRequestEventArgs(IView view)
    {
        View = view;
    }

    public IView View { get; }
}
