export interface IExececuteResponse {
  statusAdodb: boolean;
  captured: boolean;
  cmd: Array<string>;
  result: string;
}

export async function execute(
  command: Array<string>,
): Promise<IExececuteResponse> {
  let process = Deno.run({ cmd: command, stdout: "piped", stderr: "piped" });

  let response: string = "";

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
      } catch (ex) {
        break;
      }
    }
  }

  let status = await process.status();
  process.stdout?.close();
  process.stderr?.close();
  process.close();

  response = response.trim();
  const statusAdodb : boolean = response == "" ? false : true

  const resultObj : string = statusAdodb ? response : "{}"

  let result = {
    captured: status.success,
    cmd: command,
    statusAdodb: statusAdodb,
    result: resultObj,
  };

  return result;
}
