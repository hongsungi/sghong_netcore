using System.ComponentModel.DataAnnotations;

namespace Manager.Request.Manage
{
    public class AdminSearch : Search
    {
        public string groupcode { get; set; }

        public AdminSearch()
        {
            searchtype = "adminname";
        }
    }

    public class AdminAddRequest
    {
        [Required(ErrorMessage = "아이디를 입력하여 주세요.")]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "아이디를 입력하여 주세요.")]
        [RegularExpression("^[a-zA-Z0-9]*$", ErrorMessage = "아이디를 영숫자로만 입력하여 주세요.")]
        public string? adminid { get; set; }

        [Required(ErrorMessage = "아이디 중복 체크를 해 주세요.")]
        [StringLength(1, ErrorMessage = "아이디 중복 체크를 해 주세요.")]
        public string? checkidAvailable { get; set; }

        [Required(ErrorMessage = "아이디 중복 체크를 해 주세요.")]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "아이디 중복 체크를 해 주세요.")]
        [RegularExpression("^[a-zA-Z0-9]*$", ErrorMessage = "아이디 중복 체크를 해 주세요.")]
        public string? checkid { get; set; }

        [Required(ErrorMessage = "비밀번호를 입력하여 주세요.")]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "비밀번호를 입력하여 주세요.")]
        public string? pwd { get; set; }

        [Required(ErrorMessage = "비밀번호 확인을 입력하여 주세요.")]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "비밀번호 확인을 입력하여 주세요.")]
        public string? pwd1 { get; set; }

        [Required(ErrorMessage = "그룹코드를 선택하여 주세요.")]
        [Range(1000, 9999, ErrorMessage = "그룹코드를 선택하여 주세요.")]
        public int groupcode { get; set; }

        [Required(ErrorMessage = "이름을 입력하여 주세요.")]
        [StringLength(12, MinimumLength = 2, ErrorMessage = "이름을 입력하여 주세요.")]
        public string? name { get; set; }

        [Required(ErrorMessage = "핸드폰번호를 입력하여 주세요.")]
        [StringLength(3, MinimumLength = 3, ErrorMessage = "핸드폰번호를 입력하여 주세요.")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "핸드폰번호를 숫자로만 입력하여 주세요.")]
        public string? hp1 { get; set; }

        [Required(ErrorMessage = "핸드폰번호를 입력하여 주세요.")]
        [StringLength(4, MinimumLength = 3, ErrorMessage = "핸드폰번호를 입력하여 주세요.")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "핸드폰번호를 숫자로만 입력하여 주세요.")]
        public string? hp2 { get; set; }

        [Required(ErrorMessage = "핸드폰번호를 입력하여 주세요.")]
        [StringLength(4, MinimumLength = 4, ErrorMessage = "핸드폰번호를 입력하여 주세요.")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "핸드폰번호를 숫자로만 입력하여 주세요.")]
        public string? hp3 { get; set; }
    }

    public class AdminDuplicationRequest
    {
        [Required(ErrorMessage = "아이디를 입력하여 주세요.")]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "아이디를 입력하여 주세요.")]
        [RegularExpression("^[a-zA-Z0-9]*$", ErrorMessage = "아이디를 영숫자로만 입력하여 주세요.")]
        public string? adminid { get; set; }
    }

    public class AdminModifyGroupRequest
    {
        [Required(ErrorMessage = "입력값이 없습니다.")]
        public string? adminid { get; set; }

        [Required(ErrorMessage = "입력값이 없습니다.")]
        public string? groupcode { get; set; }
    }

    public class AdminPwdModifyRequest
    {
        [Required(ErrorMessage = "입력값이 없습니다.")]
        public string? adminid { get; set; }

        [Required(ErrorMessage = "비밀번호를 입력하여 주세요.")]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "비밀번호를 입력하여 주세요.")]
        public string? pwd { get; set; }

        [Required(ErrorMessage = "비밀번호 확인을 입력하여 주세요.")]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "비밀번호 확인을 입력하여 주세요.")]
        public string? pwd1 { get; set; }
    }

    public class AdminHpModifyRequest
    {
        [Required(ErrorMessage = "입력값이 없습니다.")]
        public string? adminid { get; set; }

        [Required(ErrorMessage = "핸드폰번호를 입력하여 주세요.")]
        [StringLength(3, MinimumLength = 3, ErrorMessage = "핸드폰번호를 입력하여 주세요.")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "핸드폰번호를 숫자로만 입력하여 주세요.")]
        public string? hp1 { get; set; }

        [Required(ErrorMessage = "핸드폰번호를 입력하여 주세요.")]
        [StringLength(4, MinimumLength = 3, ErrorMessage = "핸드폰번호를 입력하여 주세요.")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "핸드폰번호를 숫자로만 입력하여 주세요.")]
        public string? hp2 { get; set; }

        [Required(ErrorMessage = "핸드폰번호를 입력하여 주세요.")]
        [StringLength(4, MinimumLength = 4, ErrorMessage = "핸드폰번호를 입력하여 주세요.")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "핸드폰번호를 숫자로만 입력하여 주세요.")]
        public string? hp3 { get; set; }
    }

    public class AdminInfoModifyRequest
    {
        [Required(ErrorMessage = "입력값이 없습니다.")]
        public string? adminid { get; set; }

        [Required(ErrorMessage = "그룹코드를 선택하여 주세요.")]
        [Range(1000, 9999, ErrorMessage = "그룹코드를 선택하여 주세요.")]
        public int groupcode { get; set; }

        [Required(ErrorMessage = "이름을 입력하여 주세요.")]
        [StringLength(12, MinimumLength = 2, ErrorMessage = "이름을 입력하여 주세요.")]
        public string? name { get; set; }
    }

    public class AdminDeleteRequest
    {
        [Required(ErrorMessage = "입력값이 없습니다.")]
        public string? adminid { get; set; }
    }

    public class AdminMenuAuthRequest
    {
        [Required(ErrorMessage = "잘못 된 경로 입니다.")]
        public string? MCode1 { get; set; }

        [Required(ErrorMessage = "잘못 된 경로 입니다.")]
        public string? MCode2 { get; set; }

        [Required(ErrorMessage = "잘못 된 경로 입니다.")]
        public string? authType { get; set; }
    }

    public class AdminMyPwdModifyRequest
    {
        [Required(ErrorMessage = "현재 비밀번호를 입력하여 주세요.")]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "현재 비밀번호를 입력하여 주세요.")]
        public string? prevpwd { get; set; }

        [Required(ErrorMessage = "비밀번호를 입력하여 주세요.")]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "비밀번호를 입력하여 주세요.")]
        public string? pwd { get; set; }

        [Required(ErrorMessage = "비밀번호 확인을 입력하여 주세요.")]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "비밀번호 확인을 입력하여 주세요.")]
        public string? pwd1 { get; set; }
    }
}
