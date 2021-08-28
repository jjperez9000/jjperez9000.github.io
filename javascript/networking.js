
function readSubmission() {
    let image = "Host A -----> "
    console.log(document.getElementById("numRouters").value)

    for (let i=0; i<document.getElementById("numRouters").value; i++) {
        image += "R "
        image += i.toString();
        image += " -----> "
    }
    image += "Host B";
    document.getElementById("graphic").innerText = image

    //convert Packet
    let packetAmt = document.getElementById("packetSize").value;
    if (document.getElementById("packetType").value === 'B') {
        packetAmt *= 8;
    }
    if (document.getElementById("packetMultiplier").value === 'K') {
        packetAmt *= 1000;
    } else if (document.getElementById("packetMultiplier").value === 'M') {
        packetAmt *= (1000 * 1000);
    }

    //convert Bandwidth
    let bandwidth = document.getElementById("bandWidth").value;
    if (document.getElementById("biteType").value === 'B') {
        bandwidth *= 8;
    }
    if (document.getElementById("biteSize").value === 'K') {
        bandwidth *= 1000;
    } else if (document.getElementById("biteSize").value === 'M') {
        bandwidth *= (1000 * 1000);
    }

    //convert Travel Time
    let cableSpeed = document.getElementById("cableSpeed").value;
    if (document.getElementById("cableDistanceUnit").value === 'm') {
        cableSpeed /= 1000;
    }
    
    let d_trans = (parseInt(document.getElementById("numRouters").value) + 1) * ((packetAmt/bandwidth) * 1000)

    let d_prop = (parseInt(document.getElementById("numRouters").value) + 1) * ((document.getElementById("distance").value * 1000)/cableSpeed);

    let d_proc = document.getElementById("numRouters").value * document.getElementById("sfD").value;

    let d = d_trans + d_prop + d_proc;
    document.getElementById("work").innerText = (parseInt(document.getElementById("numRouters").value) + 1) + "(" + (packetAmt/bandwidth) * 1000 + ") +" + (parseInt(document.getElementById("numRouters").value) + 1) + "(" + ((document.getElementById("distance").value * 1000)/cableSpeed) + ") + " + document.getElementById("numRouters").value + " (" + document.getElementById("sfD").value + ")"  ;
    document.getElementById("answer").innerText = "delay  = " + d + " ms";  
}