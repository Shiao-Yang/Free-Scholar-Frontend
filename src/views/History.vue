<template>

  <div class="background">
    <div class="selfInformation">
    </div>
    <div class="historyList">
      <div class="title">
        历史记录
      </div>
    </div>
  </div>



</template>

<script>
export default {
  name: "History"
}
</script>

<style scoped>

.selfInformation{
  position: absolute;
  height: 200px;
  width: 1350px;
  left: 0;
  right: 0;
  /*margin: 0 auto;*/
  background-color:#F4F4F4;
  border-radius: 10px;
  margin-top: 0px;
  /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);*/
}
.historyList {
  position: absolute;
  height: 600px;
  width: 1350px;
  left: 0;
  right: 0;
  top: 225px;
  /*margin: 0 auto;*/
  background-color:#F4F4F4;
  border-radius: 10px;
  margin-top: 0px;
}
.historyList .title {
  position: absolute;
  font-size: 35px;
  left: 40px;
  top: 20px;
}
.Image {
  position: absolute;

}
.background {
  position: absolute;
}
.cover {
  position: absolute;
  height: 230px;
  width: 230px;
  top: 20px;
  /*margin: 20px;*/
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
}

.line_1 .number {
  position: absolute;
  font-size: 35px;

  left: 770px;
  top: 20px;
}
.line_2 .major {
  position: absolute;
  font-size: 35px;
  left: 250px;
  bottom: 20px;
}

.line_2 .thumb {
  position: absolute;
  font-size: 35px;
  left: 650px;
  bottom: 20px;
}
.line_2 .number {
  position: absolute;
  font-size: 35px;
  left: 770px;
  bottom: 20px;
}
.university {
  position: absolute;
  color: #4DA5FF;
  font-size: 35px;
  left: 1000px;
  top: 20px;
}
.academicAchieve .title {
  font-size: 35px;
  margin: 20px;
}
.academicAchieve .paper {
  display: inline-block;
  font-size: 28px;
  margin-left: 20px;
}
.academicAchieve .thumb {
  position: absolute;
  height: 35px;
  width: 35px;
  right: 500px;
}
.academicAchieve .star {
  position: absolute;
  height: 40px;
  width: 40px;
  right: 330px;
}
.academicAchieve .citation {
  display: inline-block;
  position: absolute;
  font-size: 28px;
  font-weight: bold;
  right: 100px;
}
.academicAchieve .thumb_number {
  display: inline-block;
  position: absolute;
  font-size: 28px;
  font-weight: bold;
  right: 460px;
}
.academicAchieve .star_number {
  display: inline-block;
  position: absolute;
  font-size: 28px;
  font-weight: bold;
  right: 290px;
}
.academicAchieve .citation_number {
  display: inline-block;
  position: absolute;
  font-size: 28px;
  font-weight: bold;
  right: 70px;
}
.academicAchieve .line {
  margin: 20px;
  width: 1460px;
  height: 2px;
  background-color: #e0e0e0;
}
</style>