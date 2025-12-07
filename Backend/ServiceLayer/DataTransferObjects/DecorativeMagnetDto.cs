using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.DataTransferObjects
{
    public class DecorativeMagnetDto
    {
        public int? Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public int? ImageId { get; set; }

        public int? ThumbnailId { get; set; }
    }

}
