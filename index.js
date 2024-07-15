const { calc } = require("./calc");
const moroccanNames = require("./moroccan_names.json");

function run() {
  let allNameList = [];
  const firstMoroccanName = moroccanNames[0].name;
  console.log("The First Name: ", firstMoroccanName);

  const birthDate = new Date("2024-08-24");
  const name = "bouaouin";

  moroccanNames.forEach((item) => {
    const result = calc(item.name, birthDate, name);
    console.log("The Result: ", result);
    allNameList.push(result);
  });
}

run();
