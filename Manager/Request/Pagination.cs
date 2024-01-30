namespace Manager.Request
{
    public class Pagination
    {
        public int totalRecordCount { get; set; }
        public int totalPageCount { get; set; }
        public int startPage { get; set; }
        public int endPage { get; set; }
        public int limitStart { get; set; }
        public bool existPrevPage { get; set; }
        public bool existNextPage { get; set; }

        public Pagination(int totalRecordCount, Search search)
        {
            if (totalRecordCount > 0)
            {
                this.totalRecordCount = totalRecordCount;
                calculation(search);
            }
        }

        public void calculation(Search search)
        {
            // 전체 페이지 수 계산
            totalPageCount = ((totalRecordCount - 1) / search.recordsize) + 1;

            // 현재 페이지 번호가 전체 페이지 수보다 큰 경우, 현재 페이지 번호에 전체 페이지 수 저장
            if (search.page > totalPageCount)
            {
                search.page = totalPageCount;
            }

            // 첫 페이지 번호 계산
            startPage = ((search.page - 1) / search.pagesize) * search.pagesize + 1;

            // 끝 페이지 번호 계산
            endPage = startPage + search.pagesize - 1;

            // 끝 페이지가 전체 페이지 수보다 큰 경우, 끝 페이지 전체 페이지 수 저장
            if (endPage > totalPageCount)
            {
                endPage = totalPageCount;
            }

            // LIMIT 시작 위치 계산
            limitStart = (search.page - 1) * search.recordsize;

            // 이전 페이지 존재 여부 확인
            existPrevPage = startPage != 1;

            // 다음 페이지 존재 여부 확인
            existNextPage = (endPage * search.recordsize) < totalRecordCount;
        }
    }
}
