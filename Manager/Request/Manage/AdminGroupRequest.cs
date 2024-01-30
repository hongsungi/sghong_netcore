using System.ComponentModel.DataAnnotations;

namespace Manager.Request.Manage
{
    public class AdminGroupRequest
    {
        [Required(ErrorMessage = "그룹명을 입력하여 주세요.")]
        public string? groupname { get; set; }

        [Required(ErrorMessage = "그룹설명을 입력하여 주세요.")]
        public string? groupdesc { get; set; }
        public string[]? main_write { get; set; }
        public string[]? main_read { get; set; }
        public string[]? sub_write { get; set; }
        public string[]? sub_read { get; set; }
    }
}
