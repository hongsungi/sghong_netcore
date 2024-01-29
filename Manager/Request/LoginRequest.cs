using System.ComponentModel.DataAnnotations;

namespace Manager.Request
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "아이디를 입력 하여 주세요.")]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "아이디를 정확히 입력하여 주세요.")]
        public string? mid { get; set; }

        [Required(ErrorMessage = "비밀번호를 입력 하여 주세요.")]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "비밀번호를 정확히 입력하여 주세요.")]
        public string? mpwd { get; set; }

        public string? ProgID { get; set; }

        public string? saveid { get; set; }
        
    }
}
