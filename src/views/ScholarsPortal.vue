<template>

    <div class="background">
        <div class="ScholarsTop">
            <div class="Image">
                <img src="../assets/YAN.jpg" class="cover">
            </div>
            <div class="line_1">
                <div class="name">
                    YAN
                </div>
                <div class="visitors">
                    访问量
                </div>
                <div class="number">
                    574
                </div>
                <div class="university">
                    北京航空航天大学
                </div>
            </div>
            <div class="line_2">
                <div class="major">
                    软件工程
                </div>

                <div class="thumb">
                    点赞量
                </div>
                <div class="number">
                    1752
                </div>
            </div>


        </div>

        <div class="academicAchieve">
            <div>
                <img src="../assets/img/ScholarsPortal/AcademicAchieve.svg" class="academic">
                <div class="title">学术成果</div>
            </div>
            <div class="contents">
                <div class="paper">急性脑梗死的治疗进展</div>
                <img src="../assets/img/thumb.png" class="thumb">
                <div class="thumb_number">2</div>
                <img src="../assets/img/star.svg" class="star">
                <div class="star_number">31</div>
                <div class="citation">引用次数</div>
                <div class="citation_number">4</div>
                <div class="line"></div>
            </div>
            <div class="contents">
                <div class="paper">急性脑梗死的治疗进展</div>
                <img src="../assets/img/thumb.png" class="thumb">
                <div class="thumb_number">2</div>
                <img src="../assets/img/star.svg" class="star">
                <div class="star_number">31</div>
                <div class="citation">引用次数</div>
                <div class="citation_number">4</div>
                <div class="line"></div>
            </div>
            <div class="contents">
                <div class="paper">急性脑梗死的治疗进展</div>
                <img src="../assets/img/thumb.png" class="thumb">
                <div class="thumb_number">2</div>
                <img src="../assets/img/star.svg" class="star">
                <div class="star_number">31</div>
                <div class="citation">引用次数</div>
                <div class="citation_number">4</div>
                <div class="line"></div>
            </div>
            <div class="contents">
                <div class="paper">急性脑梗死的治疗进展</div>
                <img src="../assets/img/thumb.png" class="thumb">
                <div class="thumb_number">2</div>
                <img src="../assets/img/star.svg" class="star">
                <div class="star_number">31</div>
                <div class="citation">引用次数</div>
                <div class="citation_number">4</div>
                <div class="line"></div>
            </div>
        </div>
    </div>



</template>

<script>
    export default {
        name: "ScholarsPortal"
    }
</script>

<style scoped>

    .ScholarsTop {
        position: relative;
        height: 140px;
        width: 100%;
        top:20px;
        margin: 0 auto;

        background-color: white;
        border-radius: 10px;
        /*margin-top: 50px;*/
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
    }
    .academicAchieve {
        position: relative;
        height: 500px;
        width: 100%;
        top: 50px;
        background-color: white;
        border-radius: 10px;
        margin: 0 auto;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
    }

    .Image {
        position: absolute;

    }
    .background {
        position: absolute;
        width: 100%;
        margin: 0 auto;
    }
    .cover {
        position: relative;
        height: 170px;
        width: 170px;
        top: -30px;
        /*margin: 20px;*/
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
    }
    .line_1 {
        width: 100%;
        text-align: center;
    }
    .line_1 .name {

        position: absolute;
        font-size: 25px;
        left: 200px;
        top: 20px;
    }
    .line_1 .visitors {
        position: absolute;
        font-size: 25px;
        left: 600px;
        top: 20px;

    }
    .line_1 .number {

        position: absolute;
        font-size: 25px;

        left: 680px;
        top: 20px;
    }
    .line_2 .major {
        position: absolute;
        font-size: 25px;
        left: 200px;
        bottom: 20px;
    }
    .line_2 .thumb {
        position: absolute;
        font-size: 25px;
        left: 600px;
        bottom: 20px;
    }
    .line_2 .number {
        position: absolute;
        font-size: 25px;
        left: 680px;
        bottom: 20px;
    }
    .line_1 .university {

        position: absolute;
        color: #4DA5FF;
        font-size: 25px;
        left: 1000px;
        top: 20px;
    }
    .academic {
        position: relative;
        display: inline-block;
        height: 45px;
        width: 45px;
        margin-top: 20px;
        margin-left: 20px;
    }
    .academicAchieve .contents{
        margin: 0 auto;
    }
    .academicAchieve .title {
        position: relative;
        display: inline-block;
        top: -10px;
        font-size: 35px;
        left: 10px;
        /*margin: 20px;*/
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
        /*margin: 20px;*/
        margin: 10px 18px;
        width: 98%;
        height: 2px;
        background-color: #e0e0e0;
    }
</style>