export async function execute(command) {
    let process = Deno.run({ cmd: command, stdout: "piped", stderr: "piped" });
    let response = "";
    let decoder = new TextDecoder();
    if (process) {
        const buff = new Uint8Array(1);
        while (true) {
            try {
                let result = await process.stdout?.read(buff);
                if (!result) {
                    break;
                }
                response = response + decoder.decode(buff);
            }
            catch (ex) {
                break;
            }
        }
    }
    let status = await process.status();
    process.stdout?.close();
    process.stderr?.close();
    process.close();
    response = response.trim();
    const statusAdodb = response == "" ? false : true;
    const resultObj = statusAdodb ? response : "{}";
    let result = {
        captured: status.success,
        cmd: command,
        statusAdodb: statusAdodb,
        result: resultObj,
    };
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4ZWN1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsTUFBTSxDQUFDLEtBQUssVUFBVSxPQUFPLENBQzNCLE9BQXNCO0lBRXRCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFFM0UsSUFBSSxRQUFRLEdBQVcsRUFBRSxDQUFDO0lBRTFCLElBQUksT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7SUFFaEMsSUFBSSxPQUFPLEVBQUU7UUFDWCxNQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvQixPQUFPLElBQUksRUFBRTtZQUNYLElBQUk7Z0JBQ0YsSUFBSSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDWCxNQUFNO2lCQUNQO2dCQUNELFFBQVEsR0FBRyxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM1QztZQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNYLE1BQU07YUFDUDtTQUNGO0tBQ0Y7SUFFRCxJQUFJLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNwQyxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQ3hCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDeEIsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRWhCLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsTUFBTSxXQUFXLEdBQWEsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7SUFFM0QsTUFBTSxTQUFTLEdBQVksV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtJQUV4RCxJQUFJLE1BQU0sR0FBRztRQUNYLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTztRQUN4QixHQUFHLEVBQUUsT0FBTztRQUNaLFdBQVcsRUFBRSxXQUFXO1FBQ3hCLE1BQU0sRUFBRSxTQUFTO0tBQ2xCLENBQUM7SUFFRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDIn0=