namespace Manager.Request
{
    public class Search
    {
        public int page { get; set; }
        public int recordsize { get; set; }
        public int pagesize { get; set; }
        public string? searchtype { get; set; }
        public string? keyword { get; set; }
        public Pagination? pagination { get; set; }

        public Search()
        {
            this.page = 1;
            this.recordsize = 10;
            this.pagesize = 10;
        }
    }

    public class SearchParam
    {
        public string? name { get; set; }
        public string? value { get; set; }
    }
}
