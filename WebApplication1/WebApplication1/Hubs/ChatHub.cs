using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using WebApplication1.Hubs.Clients;
using WebApplication1.Models;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public async Task SendMessage(ChatMessage message)
        {
            await Clients.All.ReceiveMessage(message);
        }
    }
}