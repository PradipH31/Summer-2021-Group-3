using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(ChatMessage message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
        public async Task SendGroupMessage(ChatMessage message, string group)
        {
            await Clients.Group(group).SendAsync("ReceiveGroupMessage", message);
        }
        public async Task AddToGroup(string firstName, string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send",
                new
                {
                    message = $"{firstName} has joined the group {groupName}."
                }
                );
        }

        public async Task RemoveFromGroup(string firstName, string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send",
                new
                {
                    message = $"{firstName} has left the group {groupName}."
                });
        }
    }
}