import os from 'node:os';
import { cpuUsage } from 'node:process';

function getSystemCPUInfo() {
    const oldCPUs = os.cpus();

    setTimeout(() => {
        const newCPUs = os.cpus();
        
        const cpuUsage = newCPUs.map((cpu, index) => {

            return{
                core : index,
                usage: calculateCPUUsage(oldCPUs[index], cpu) + '%',
            }
        })

        const totalmem = os.totalmem() / (1024 * 1024);
        const freemem = os.freemem() / (1024 * 1024);
        const usedmem = totalmem - freemem;
        console.clear();
        console.table(cpuUsage, ["core", "usage"],);
        console.log("Total Memory: ", usedmem.toFixed(2), "MB");
    }, 1000);
}


function calculateCPUUsage(oldCPUs, newCPUs) {
    const oldTotal = Object.values(oldCPUs.times).reduce((acc, time) => acc + time);
    const newTotal = Object.values(newCPUs.times).reduce((acc, time) => acc + time);
    const idleDiff = newCPUs.times.idle - oldCPUs.times.idle;   
    const totalDiff = newTotal - oldTotal;

    const usage = ((totalDiff - idleDiff) / totalDiff) * 100;
    return usage.toFixed(1);
}

setInterval(getSystemCPUInfo,1000)