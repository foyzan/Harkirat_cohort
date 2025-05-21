import chalk from "chalk";
import os from "node:os";
import si from "systeminformation";

// Fetch GPU information using systeminformation package
function getGpuInfo() {
  return si.graphics();
}

// Main function to fetch and display system stats
async function getSystemCPUInfo() {
  const oldCPUs = os.cpus(); // Capture CPU stats at start

  setTimeout(async () => {
    const newCPUs = os.cpus(); // Capture CPU stats after 1 second

    // Calculate CPU usage for each core
    const cpuUsage = newCPUs.map((cpu, index) => ({
      core: index,
      usage: calculateCPUUsage(oldCPUs[index], cpu) + "%",
    }));

    // Calculate memory stats in MB
    const totalmem = os.totalmem() / (1024 * 1024);
    const freemem = os.freemem() / (1024 * 1024);
    const usedmem = totalmem - freemem;

    console.clear();

    // Display system stats
    console.log(chalk.bgMagenta(`============== System stats ==============`));
    
    console.table(cpuUsage, ["core", "usage"]);

    console.log(chalk.bgCyan(`============== Memory stats ==============`));
    // Highlight memory usage in red if used memory is high
    console.log(
      usedmem > 10000
        ? chalk.redBright(
            `Total Memory: ${totalmem.toFixed(
              2
            )} MB | Used Memory: ${usedmem.toFixed(
              2
            )} MB | Free Memory: ${freemem.toFixed(2)} MB`
          )
        : chalk.greenBright(
            `Total Memory: ${totalmem.toFixed(
              2
            )} MB | Used Memory: ${usedmem.toFixed(
              2
            )} MB | Free Memory: ${freemem.toFixed(2)} MB`
          )
    );
    console.log(chalk.bgMagenta(`=========================================`));

    // Fetch and display GPU stats
    console.log(chalk.bgCyan(`============== GPU stats ==============`));
    try {
      const data = await getGpuInfo();
      // If GPU controllers are found, display their model and VRAM
      if (data.controllers && data.controllers.length > 0) {
        const gpuInfo = data.controllers.map((ctrl) => ({
          Model: ctrl.model,
          vram: ctrl.vram,
        }));
        console.table(gpuInfo);
      } else {
        console.log("No GPU controllers found.");
      }
    } catch (error) {
      // Handle errors in fetching GPU info
      console.error("Error fetching graphics information:", error);
    }
    console.log(chalk.bgCyan(`=========================================`));
  }, 1000);
}

// Calculate CPU usage percentage between two snapshots
function calculateCPUUsage(oldCPUs, newCPUs) {
  const oldTotal = Object.values(oldCPUs.times).reduce(
    (acc, time) => acc + time
  );
  const newTotal = Object.values(newCPUs.times).reduce(
    (acc, time) => acc + time
  );
  const idleDiff = newCPUs.times.idle - oldCPUs.times.idle;
  const totalDiff = newTotal - oldTotal;

  const usage = ((totalDiff - idleDiff) / totalDiff) * 100;
  return usage.toFixed(1);
}

// Run system stats display every second
setInterval(getSystemCPUInfo, 3000);
