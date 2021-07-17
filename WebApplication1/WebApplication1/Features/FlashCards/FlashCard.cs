namespace WebApplication1.Features.FlashCards
{
    public class FlashCard
    {
        public int FlashCardId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public int FlashCardSetId { get; set; }
        public virtual FlashCardSet flashCardSet { get; set; }

    }
}
