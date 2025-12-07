using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Entity
{

    [Table("DecorativeMagnet", Schema = "DecorativeMagnetGallery")]
    public class DecorativeMagnet
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        [ForeignKey("Image")]
        public int? ImageId { get; set; }

        public Image? Image { get; set; }

        [ForeignKey("Thumbnail")]
        public int? ThumbnailId { get; set; }

        public Thumbnail? Thumbnail { get; set; }

    }

}
