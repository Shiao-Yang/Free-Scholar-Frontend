<template>
    <div class="NS">
        <div class="left">
            <div class="name">
                <div class="blackBox">
                    <img src="../assets/YAN.jpg" class="image">
                    <div class="userName" style="position: absolute; text-align: center;
                     font-size: 45px; display: inline-block; left: 140px; right: 0;
                     top: 75px; color: white; font-weight: bold">王海涛</div>
                </div>
                <i class="bx bxs-user-plus"></i>
                <div style="position: absolute; margin-top: 22px; left: 70px; font-size: 25px">关注</div>
                <i class="bx bxs-award"></i>
                <div style="position: absolute; margin-top: 22px; left: 220px; font-size: 25px;
                 color: #ffcb74">已认领</div>
                <i class="bx bxs-chat"></i>
                <div style="position: absolute; margin-top: 22px; left: 410px; font-size: 25px">私信</div>
            </div>
        </div>
        <div class="middle">

        </div>
        <div class="right">

        </div>
    </div>

</template>

<script>
    export default {
        name: "NS"
    }
</script>

<style scoped>
    .left {
        position: relative;
        display: inline-block;
        width: 25%;
        height: 1000px;
        background-color: #4DA5FF;
    }
    .middle {
        position: relative;
        display: inline-block;
        width: 50%;
        height: 1000px;
        background-color: #00CA97;
    }
    .right {
        position: relative;
        display: inline-block;
        width: 25%;
        height: 1000px;
        background-color: #0fc70f;
    }
    .left .name {
        position: relative;
        background-color: white;
        width: 100%;
        height: 280px;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
    }
    .name .bxs-user-plus {
        position: absolute;
        display: inline-block;
        font-size: 40px;
        margin-top: 20px;
        margin-left: 20px;
        color: #333333;
    }
    .name .bxs-award {
        position: absolute;
        display: inline-block;
        font-size: 40px;
        margin-top: 20px;
        left: 180px;
        color: #ffcb74;
    }
    .name .bxs-chat {
        position: absolute;
        display: inline-block;
        font-size: 40px;
        margin-top: 20px;
        left: 360px;
        color: #333333;
    }
    .blackBox {
        position: relative;
        background: url("../assets/img/ScholarsPortal/nameBackground.jpg");
        position: relative; width: 100%; height: 200px;
        border-radius: 10px
    }
    .blackBox .image {
        position: absolute;
        padding: 30px;
        width: 140px; height: 140px;
        border-radius: 10px;
        display: inline-block
    }
</style>