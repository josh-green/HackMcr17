using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wappies.Utility
{
    class Result
    {
        public int Code { get; set; }
        public String Message { get; set; }

        public Result(int CodeNo, String MessageTxt)
        {
            Code = CodeNo;
            Message = MessageTxt;
        }
    }
}
