using GroundStation.UI.MainMonitor.Events;

namespace GroundStation.UI.MainMonitor.Views;

public interface IView
{
    event EventHandler<NavigationRequestEventArgs>? NavigationRequest;
    void OnNavigated();
    void Render();
}
