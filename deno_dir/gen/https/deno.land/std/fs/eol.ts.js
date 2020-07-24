// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
/** EndOfLine character enum */
export var EOL;
(function (EOL) {
    EOL["LF"] = "\n";
    EOL["CRLF"] = "\r\n";
})(EOL || (EOL = {}));
const regDetect = /(?:\r?\n)/g;
/**
 * Detect the EOL character for string input.
 * returns null if no newline
 */
export function detect(content) {
    const d = content.match(regDetect);
    if (!d || d.length === 0) {
        return null;
    }
    const crlf = d.filter((x) => x === EOL.CRLF);
    if (crlf.length > 0) {
        return EOL.CRLF;
    }
    else {
        return EOL.LF;
    }
}
/** Format the file to the targeted EOL */
export function format(content, eol) {
    return content.replace(regDetect, eol);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW9sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUUxRSwrQkFBK0I7QUFDL0IsTUFBTSxDQUFOLElBQVksR0FHWDtBQUhELFdBQVksR0FBRztJQUNiLGdCQUFTLENBQUE7SUFDVCxvQkFBYSxDQUFBO0FBQ2YsQ0FBQyxFQUhXLEdBQUcsS0FBSCxHQUFHLFFBR2Q7QUFFRCxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUM7QUFFL0I7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLE1BQU0sQ0FBQyxPQUFlO0lBQ3BDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUN4QixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQVMsRUFBVyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ25CLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztLQUNqQjtTQUFNO1FBQ0wsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDO0tBQ2Y7QUFDSCxDQUFDO0FBRUQsMENBQTBDO0FBQzFDLE1BQU0sVUFBVSxNQUFNLENBQUMsT0FBZSxFQUFFLEdBQVE7SUFDOUMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN6QyxDQUFDIn0=