<template>

    <div class="background">
        <div class="ScholarsTop">

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

            <div class="university">
                北京航空航天大学
            </div>
        </div>
        <div class="Image">
            <img src="../assets/YAN.jpg" class="cover">
        </div>
        <div class="academicAchieve">
            <div class="title">学术成果</div>
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
        position: absolute;
        height: 200px;
        width: 1500px;
        left: 0;
        right: 0;
        /*margin: 0 auto;*/
        background-color: white;
        border-radius: 10px;
        margin-top: 50px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
    }
    .academicAchieve {
        position: absolute;
        height: 500px;
        width: 1500px;
        top: 250px;
        left: 0;
        right: 0;
        background-color: white;
        border-radius: 10px;
        margin-top: 50px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
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

    .line_1 .name {
        position: absolute;
        font-size: 35px;
        left: 250px;
        top: 20px;
    }
    .line_1 .visitors {
        position: absolute;
        font-size: 35px;
        left: 650px;
        top: 20px;

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