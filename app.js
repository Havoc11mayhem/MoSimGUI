let robot = {};

function generateRobot() {

    robot = {
        name: document.getElementById("robotName").value,
        drivetrain: document.getElementById("drivetrain").value,
        length: Number(document.getElementById("length").value),
        width: Number(document.getElementById("width").value),

        mechanisms: {
            arm: document.getElementById("arm").checked,
            elevator: document.getElementById("elevator").checked,
            intake: document.getElementById("intake").checked
        }
    };

    drawRobot();
}

function drawRobot() {

    const canvas = document.getElementById("robotCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = 10;

    const x = canvas.width / 2;
    const y = canvas.height / 2;

    const w = robot.width * scale;
    const l = robot.length * scale;

    ctx.strokeRect(
        x - w / 2,
        y - l / 2,
        w,
        l
    );

    if (robot.mechanisms.arm) {
        ctx.fillRect(x - 15, y - 60, 30, 60);
    }

    if (robot.mechanisms.elevator) {
        ctx.fillRect(x + 40, y - 80, 20, 80);
    }

    if (robot.mechanisms.intake) {
        ctx.fillRect(x - 50, y + l / 2 - 10, 100, 20);
    }
}

function exportRobot() {

    const blob = new Blob(
        [JSON.stringify(robot, null, 2)],
        { type: "application/json" }
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = robot.name + ".json";

    link.click();
}