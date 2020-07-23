import { v4 } from "https://deno.land/std/uuid/mod.ts";
function splitCommand(command) {
    var myRegexp = /[^\s"]+|"([^"]*)"/gi;
    var splits = [];
    do {
        var match = myRegexp.exec(command);
        if (match != null) {
            splits.push(match[1] ? match[1] : match[0]);
        }
    } while (match != null);
    return splits;
}
export var OutputMode;
(function (OutputMode) {
    OutputMode[OutputMode["None"] = 0] = "None";
    OutputMode[OutputMode["StdOut"] = 1] = "StdOut";
    OutputMode[OutputMode["Capture"] = 2] = "Capture";
    OutputMode[OutputMode["Tee"] = 3] = "Tee";
})(OutputMode || (OutputMode = {}));
export const exec = async (command, options = { output: OutputMode.StdOut, verbose: false }) => {
    let splits = splitCommand(command);
    let uuid = "";
    if (options.verbose) {
        uuid = v4.generate();
        console.log(``);
        console.log(`Exec Context: ${uuid}`);
        console.log(`    Exec Options: `, options);
        console.log(`    Exec Command: ${command}`);
        console.log(`    Exec Command Splits:  [${splits}]`);
    }
    let p = Deno.run({ cmd: splits, stdout: "piped", stderr: "piped" });
    let response = "";
    let decoder = new TextDecoder();
    if (p && options.output != OutputMode.None) {
        const buff = new Uint8Array(1);
        while (true) {
            try {
                let result = await p.stdout?.read(buff);
                if (!result) {
                    break;
                }
                if (options.output == OutputMode.Capture ||
                    options.output == OutputMode.Tee) {
                    response = response + decoder.decode(buff);
                }
                if (options.output == OutputMode.StdOut ||
                    options.output == OutputMode.Tee) {
                    await Deno.stdout.write(buff);
                }
            }
            catch (ex) {
                break;
            }
        }
    }
    let status = await p.status();
    p.stdout?.close();
    p.stderr?.close();
    p.close();
    let result = {
        status: {
            code: status.code,
            success: status.success,
        },
        output: response.trim(),
    };
    if (options.verbose) {
        console.log("    Exec Result: ", result);
        console.log(`Exec Context: ${uuid}`);
        console.log(``);
    }
    return result;
};
export const execSequence = async (commands, options = {
    output: OutputMode.StdOut,
    continueOnError: false,
    verbose: false,
}) => {
    let results = [];
    for (let i = 0; i < commands.length; i++) {
        let result = await exec(commands[i], options);
        results.push(result);
        if (options.continueOnError == false && result.status.code != 0) {
            break;
        }
    }
    return results;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUV2RCxTQUFTLFlBQVksQ0FBQyxPQUFlO0lBQ25DLElBQUksUUFBUSxHQUFHLHFCQUFxQixDQUFDO0lBQ3JDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUVoQixHQUFHO1FBRUQsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFHakIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0M7S0FDRixRQUFRLEtBQUssSUFBSSxJQUFJLEVBQUU7SUFFeEIsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELE1BQU0sQ0FBTixJQUFZLFVBS1g7QUFMRCxXQUFZLFVBQVU7SUFDcEIsMkNBQVEsQ0FBQTtJQUNSLCtDQUFNLENBQUE7SUFDTixpREFBTyxDQUFBO0lBQ1AseUNBQUcsQ0FBQTtBQUNMLENBQUMsRUFMVyxVQUFVLEtBQVYsVUFBVSxRQUtyQjtBQWtCRCxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUN2QixPQUFlLEVBQ2YsVUFBb0IsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQ3pDLEVBQUU7SUFDMUIsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRW5DLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNkLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUNuQixJQUFJLEdBQUcs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