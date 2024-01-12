const { spawn } = require("child_process");
const fs = require("fs");
/**
 * This provides a function, execShellCommand, that uses `spawn` to run a command.
 * It uses the current process so that the environment variables are available
 */
class ShellCommand {
  constructor() {}
  /**
   * Remove ANSI characters
   * https://stackoverflow.com/questions/25245716/remove-all-ansi-colors-styles-from-strings
   *
   * @param {*} str
   * @returns
   */
  stripAnsi(str) {
    return str.replace(
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      ""
    );
  }
  /**
   * Executes a shell command and return it as a Promise.
   * @param cmd {string}
   * @return {Promise<string>}
   */
  execShellCommand(cmd, reportLog) {
    console.log(`execShellCommand ${cmd}`);

    let p = spawn(`${cmd}`, {
      shell: true,
      env: {
        ...process.env,
        FORCE_COLOR: "1",
      },
    });

    return new Promise((resolveFunc) => {
      p.stdout.on("data", (x) => {
        process.stdout.write(x);
        if (reportLog) {
          fs.appendFileSync(reportLog, this.stripAnsi(x.toString()));
        }
      });

      p.stderr.on("data", (x) => {
        process.stderr.write(x);
        if (reportLog) {
          fs.appendFileSync(reportLog, this.stripAnsi(x.toString()));
        }
      });

      p.on("exit", (code) => {
        resolveFunc(code);
      });
    });
  }
}
module.exports = ShellCommand;
