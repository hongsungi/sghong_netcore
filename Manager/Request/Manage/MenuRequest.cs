using System.ComponentModel.DataAnnotations;

namespace Manager.Request.Manage
{
    public class MenuAddRequest
    {
        [Required(ErrorMessage = "올바른 값이 아닙니다.")]
        [StringLength(4, ErrorMessage = "올바른 값이 아닙니다.")]
        public string? menuPCode { get; set; }

        [Required(ErrorMessage = "메뉴명을 입력하여 주세요.")]
        [StringLength(20, MinimumLength = 2, ErrorMessage = "메뉴명을 정확히 입력하여 주세요.")]
        public string? menuName { get; set; }

        [Required(ErrorMessage = "메뉴 URL을 입력하여 주세요.")]
        public string? menuUrl { get; set; }
    }

    public class MenuModifyRequest
    {
        [Required(ErrorMessage = "올바른 값이 아닙니다.")]
        [StringLength(4, ErrorMessage = "올바른 값이 아닙니다.")]
        public string? menuPCode { get; set; }

        [Required(ErrorMessage = "올바른 값이 아닙니다.")]
        [StringLength(4, ErrorMessage = "올바른 값이 아닙니다.")]
        public string? menuCode { get; set; }

        [Required(ErrorMessage = "메뉴명을 입력하여 주세요.")]
        [StringLength(20, MinimumLength = 2, ErrorMessage = "메뉴명을 정확히 입력하여 주세요.")]
        public string? menuName { get; set; }

        [Required(ErrorMessage = "메뉴 URL을 입력하여 주세요.")]
        public string? menuUrl { get; set; }

        [Required(ErrorMessage = "올바른 값이 아닙니다.")]
        [StringLength(1, ErrorMessage = "올바른 값이 아닙니다.")]
        public string? menuChoice { get; set; }

        [Required(ErrorMessage = "올바른 값이 아닙니다.")]
        [StringLength(1, ErrorMessage = "올바른 값이 아닙니다.")]
        public string? menuUseFlag { get; set; }
    }

    public class MenuDeleteRequest
    {
        [Required(ErrorMessage = "올바른 값이 아닙니다.")]
        [StringLength(4, ErrorMessage = "올바른 값이 아닙니다.")]
        public string? menuPCode { get; set; }

        [Required(ErrorMessage = "올바른 값이 아닙니다.")]
        [StringLength(4, ErrorMessage = "올바른 값이 아닙니다.")]
        public string? menuCode { get; set; }
    }

    public class MenuDisplayNumModifyRequest
    {
        [Required(ErrorMessage = "올바른 값이 아닙니다.")]
        [StringLength(1, ErrorMessage = "올바른 값이 아닙니다.")]
        public string? udType { get; set; }

        [Required(ErrorMessage = "올바른 값이 아닙니다.")]
        [StringLength(4, ErrorMessage = "올바른 값이 아닙니다.")]
        public string? menuPCode { get; set; }

        [Required(ErrorMessage = "올바른 값이 아닙니다.")]
        [StringLength(4, ErrorMessage = "올바른 값이 아닙니다.")]
        public string? menuCode { get; set; }
    }
}
