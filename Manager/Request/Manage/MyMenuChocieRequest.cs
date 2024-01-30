using System.ComponentModel.DataAnnotations;

namespace Manager.Request.Manage
{
    public class MyMenuChoiceAddDeleteRequest
    {
        [Required(ErrorMessage = "잘못된 요청 입니다.")]
        [StringLength(4, ErrorMessage = "잘못된 요청 입니다.")]
        public string? menucode { get; set; }
    }

    public class MyMenuChoiceDispNumUpdateRequest
    {
        [Required(ErrorMessage = "구분 값이 없습니다.")]
        [StringLength(1, ErrorMessage = "구분 값이 없습니다.")]
        public string? udType { get; set; }

        [Required(ErrorMessage = "잘못된 요청 입니다.")]
        [StringLength(4, ErrorMessage = "잘못된 요청 입니다.")]
        public string? menucode { get; set; }
    }
}
