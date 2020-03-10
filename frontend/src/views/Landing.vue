<template>
    <admin-layout>
        <!--        <transition name="moveright" mode="in-out">-->
        <div class="frame frame-1" @click="toggleFrame" key="frame1" :style="frame1Style">
<!--            <h1>What is </h1>-->
            <h1 class="highlight">What is the fastest way to transfer value?</h1>
            <div class="table-wrap">
                <div class="table">
                    <div class="tr">
                        <div class="td td-title">Banks</div>
                        <div class="td"><span class="progress" :style="{ width: '100%' }"></span></div>
                    </div>
                    <div class="tr">
                        <div class="td td-title">Bitcoin</div>
                        <div class="td"><span class="progress" :style="{ width: '70%' }"></span> 60 min</div>
                    </div>
                    <div class="tr">
                        <div class="td td-title">Ehereum</div>
                        <div class="td"><span class="progress" :style="{ width: '80px' }"></span> 10 min</div>
                    </div>
                    <div class="tr">
                        <div class="td td-title">Other Minter wallets</div>
                        <div class="td"><span class="progress" :style="{ width: '8px' }"></span> 1 min</div>
                    </div>
                    <div class="tr highlight">
                        <div class="td td-title ">Rundax Wallet + Push gifts</div>
                        <div class="td"><span class="progress" :style="{ width: '4px' }"></span> 30 sec</div>
                    </div>
                </div>

                <div class="action-buttons">
                    <div class="video-wrapper">
                        <a href="https://www.youtube.com/watch?v=Lw6Tfhj3g8Q" TARGET="_blank" class="landing-button video-btn">
                            <div class="corners">
                                <svg xmlns="http://www.w3.org/2000/svg" width="185.5" height="119.5">
                                    <path d="M 32.5 1.5 L 0 1 L 0 31.5 M 32.5 119 L 0 119.5 L 0 89 M 185 87 L 185.5 119.5 L 155 119.5 M 153 0.5 L 185.5 0 L 185.5 30.5" fill="transparent" stroke-width="5" stroke="rgba(110, 59, 59, 1.00)" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </div>
                            <div class="play-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90">
                                    <path d="M 37.206 13.5 C 40.67 7.5 49.33 7.5 52.794 13.5 L 76.177 54 C 79.641 60 75.311 67.5 68.383 67.5 L 21.617 67.5 C 14.689 67.5 10.359 60 13.823 54 Z" transform="rotate(90 45 45)" fill="rgba(110, 59, 59, 1.00)"></path>
                                </svg>
                            </div>
                        </a>
                    </div>
                    <a href="https://testflight.apple.com/join/vG8or2ks" target="_blank" class="landing-button select-spend">
                        <div class="wrap"><div class="icon apple-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46">

                                <path d="M 40.688 35.244 C 40.025 36.776 39.241 38.185 38.332 39.482 C 37.092 41.248 36.078 42.472 35.296 43.151 C 34.083 44.266 32.784 44.836 31.394 44.869 C 30.395 44.869 29.191 44.585 27.789 44.008 C 26.383 43.435 25.091 43.151 23.909 43.151 C 22.67 43.151 21.341 43.435 19.919 44.008 C 18.495 44.585 17.348 44.885 16.471 44.915 C 15.138 44.972 13.808 44.385 12.481 43.151 C 11.634 42.412 10.575 41.146 9.306 39.352 C 7.944 37.436 6.825 35.214 5.948 32.682 C 5.009 29.946 4.538 27.297 4.538 24.732 C 4.538 21.795 5.173 19.261 6.444 17.137 C 7.443 15.432 8.773 14.087 10.437 13.099 C 12.1 12.111 13.898 11.608 15.834 11.576 C 16.894 11.576 18.283 11.903 20.009 12.547 C 21.731 13.194 22.836 13.521 23.321 13.521 C 23.683 13.521 24.911 13.138 26.993 12.374 C 28.961 11.666 30.622 11.373 31.984 11.488 C 35.672 11.786 38.442 13.24 40.285 15.859 C 36.987 17.857 35.355 20.657 35.388 24.248 C 35.417 27.045 36.432 29.372 38.426 31.22 C 39.33 32.078 40.339 32.741 41.462 33.212 C 41.219 33.918 40.962 34.595 40.688 35.244 Z M 32.23 1.959 C 32.23 4.151 31.429 6.198 29.832 8.093 C 27.906 10.345 25.575 11.647 23.048 11.442 C 23.015 11.166 22.998 10.889 22.998 10.611 C 22.998 8.506 23.914 6.254 25.541 4.412 C 26.353 3.48 27.386 2.705 28.639 2.086 C 29.889 1.477 31.072 1.14 32.184 1.082 C 32.216 1.375 32.23 1.668 32.23 1.959 Z" fill="rgba(110, 59, 59, 1.00)"></path>
                            </svg>
                        </div>Download Rundax wallet</div>
                    </a>
                    <a href="tg://resolve?domain=pushgiftsbot" target="_blank" class="landing-button select-spend">
                        <div class="wrap"><div class="icon phone-icon" style="padding-left: 18px">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="56">
                                <path d="M 7.944 10.447 C 7.944 9.464 8.741 8.667 9.724 8.667 L 31.164 8.667 C 32.148 8.667 32.944 9.464 32.944 10.447 L 32.944 48.887 C 32.944 49.87 32.148 50.667 31.164 50.667 L 9.724 50.667 C 8.741 50.667 7.944 49.87 7.944 48.887 Z" fill="transparent" stroke-width="2.67" stroke="rgba(110, 59, 59, 1.00)" stroke-linejoin="round"></path>
                                <path d="M 16.873 45.305 L 24.909 45.305 L 24.909 47.092 L 16.873 47.092 Z" fill="rgba(110, 59, 59, 1.00)" stroke="rgba(110, 59, 59, 1.00)"></path>
                            </svg>
                        </div><span class="label2">Use Telegram inline bot</span>    </div>
                    </a>
                </div>
            </div>


        </div>
        <!--        </transition>-->
        <!--        <transition name="move" mode="in-out">-->
        <div class="frame frame-2" @click="toggleFrame" key="frame2" :style="frame2Style">
            <h1 class="highlight">1-5 business days for a simple transfer, really??<br>We are living in 2020 now</h1>
            <div class="pyramid">
                <svg xmlns="http://www.w3.org/2000/svg" width="2000" height="796">
                    <path d="M 496 238 L 1978 238 L 1978 762 L 1039 762 L 1049 742.5 L 1954.5 742.5 L 1944.5 722.5 L 1059 722.5 L 1074 703 L 1929.5 703 L 1913.5 683.5 L 1089 683.5 L 1104 664 L 1898.5 664 L 1883.5 644 L 1119 644 L 1134 624 L 1868.5 624 L 1853.5 604.5 L 1149 604.5 L 1164 584.5 L 1838.5 584.5 L 1823.5 565.5 L 1179 564.5 L 1194 545 L 1808.5 546 L 1793.5 526 L 1209 525 L 1224 505.5 L 1777.5 506.5 L 1762.5 486.5 L 1239 486 L 1254 466.5 L 1747.5 466.5 L 1732.5 447 L 1269 447 L 1284 427.5 L 1717.5 427 L 1702.5 407.5 L 1299 407.5 L 1314 388 L 1687.5 388 L 1672.5 369 L 1330 368.5 L 1345 349.5 L 1657.5 349.5 L 1642.5 330 L 1360 329.5 L 1375 310 L 1627.5 310 L 1612.5 290.5 L 1390 290.5 L 1405 270.5 L 1597.5 270.5 L 1582.5 250.5 L 1420 250.5 L 1435 233 L 1567.5 233 L 1551.5 213 L 1450 213 L 1465 193.5 L 1536.5 193.5 L 1522 176.5 L 1477 176.5 L 1510.5 176.5"
                          fill="transparent" stroke-width="18" stroke="rgb(255, 255, 255)" stroke-linecap="square"
                          stroke-linejoin="round"></path>
                    <path d="M 1477 168.5 C 1477 168.5 1476.875 161.896 1481.5 157.934 C 1486.125 153.972 1482.624 156.3 1494.5 152.123 C 1506.376 147.945 1504.5 140.5 1504.5 140.5 C 1504.5 140.5 1508.75 147.236 1509.5 152.123 C 1510.25 157.009 1508 160.575 1508 160.575 C 1508 160.575 1512 161.236 1515 163.217 C 1518 165.198 1520 168.5 1520 168.5 Z"
                          fill="hsl(200, 100%, 100%)"></path>
                </svg>
            </div>
        </div>
        <!--        </transition>-->
    </admin-layout>
</template>

<script>
    import { Types } from "@/store/admin";
    import ButtonAsync from "@/components/ButtonAsync";
    import AdminLayout from "@/layouts/AdminLayout";
    import router from "@/router";
    import { isMobile } from "@/utils/dom";

    export default {
        components: {
            AdminLayout,
            ButtonAsync,
        },

        data() {
            return {
                frame: 1,
                windowWidth: 0,
                windowHeight: 0,
                translateX: 0,
                // pyramidStyles: {
                //
                // }
            };
        },

        computed: {
            frame1Style() {
                return {
                    transform: `translateX(${this.translateX}px)`
                }
            },

            frame2Style() {
                let left =  (this.windowWidth / 3) * 2 + "px";
                if (this.windowWidth <= 710) {
                    left =  (this.windowWidth / 3) * 2.5 + "px";
                }

                if (this.windowWidth <= 320) {
                    left =  (this.windowWidth / 3) * 3 + "px";
                }
                return {
                    left: left,
                    transform: `translateX(${this.translateX}px)`
                }
            }
        },

        methods: {
            toggleFrame() {
                if (this.frame === 1) this.frame = 2;
                else this.frame = 1;
            },

            getWindowWidth(event) {
                this.windowWidth = document.documentElement.clientWidth;
            },

            getWindowHeight(event) {
                this.windowHeight = document.documentElement.clientHeight;
            },

            onClick(e) {
                if (isMobile()) return;
                if (e.target && (e.target.tagName.toUpperCase() === "A" || e.target.tagName.toUpperCase() === "BUTTON")) return;

                if (this.translateX !== 0) {
                    this.translateX  = 0;
                } else {
                    this.translateX = 1094  * -1;
                }
            }
        },

        mounted() {
            this.$nextTick(function () {
                window.addEventListener("resize", this.getWindowWidth);
                window.addEventListener("resize", this.getWindowHeight);
                window.addEventListener("click", this.onClick);

                //Init
                this.getWindowWidth();
                this.getWindowHeight();
            });
        },

        beforeDestroy() {
            window.removeEventListener("resize", this.getWindowWidth);
            window.removeEventListener("resize", this.getWindowHeight);
            window.removeEventListener("click", this.onClick);
        },
    };
</script>

<style lang="less">
    .frame {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        transition: transform 500ms;
        transform: translateZ(0)
    }


    .highlight {
        text-shadow: 0px 0px 30px #f0582b;
    }

    .frame-2 {
        left: 800px;
        pointer-events: none;
    }

    .frame h1 {
        position: absolute;
        font-size: 20px;
        width: 80%;
        color: #fac758;
        text-align: center;
        padding: 0px 10%;
    }

    .frame-1 h1 {
        font-size: 30px;
        padding-top: 60px;
    }

    .frame-2 h1 {
        left: 630px;
        width: 500px;
        padding: 0px;
    }

    .table-wrap {
        position: relative;
        max-width: 800px;
        width: 100%;
        margin: auto;
    }

    .action-buttons {

        position: relative;
        max-width: 800px;
        width: 100%;
        margin: 40px auto 0px;
        padding-left: 20%;
    }


    .table {
        display: table;
        width: 100%;
        font-size: 20px;
        margin-top:229px;
        color: #fac758;
    }

    .tr {
        display: table-row;
    }

    .td {
        display: table-cell;
        padding-top: 10px;
        width: 50%;
        line-height: 20px;
        vertical-align: middle;
    }

    .td-title {
        padding-left: 20%;
    }

    @media screen and (max-width: 700px) {
        .td-title {
            padding-left: 8px;
        }

        .action-buttons {
            padding-left: 8px;
        }

        .td {
            font-size: 12px;
        }
    }

    @media screen and (max-width: 320px) {
        .td {
            font-size: 10px;
        }

        .frame h1 {
            font-size: 16px;
        }

        .frame-2 h1 {
            left: 630px;
            width: 100%;
        }
    }

    @media screen and (max-width: 414px) {
        .table {
            margin-top: 129px;
        }

        .frame-2 {
            display: none;
        }

        .frame-1 h1 {
            font-size: 20px;
            padding-top: 30px;
        }
    }

    .progress {
        height: 18px;
        display: inline-block;
        background-color: white;
    }

    .pyramid {
        position: relative;
        width: 2000px;
        height: 769px;
        left: -606px;
        top: -181 + 191px;
        /*transform-origin: top left;*/
        /*transform: scale(0.4);*/
    }

    .moveright-enter-active, .moveright-leave-active {
        transition: transform 2000ms;
    }

    .moveright-enter-active {
        transform: translateX(0%);
    }

    .moveright-leave-to {
        transform: translateX(-100%);
    }

    .moveright-enter /* .fade-leave-active below version 2.1.8 */
    {
        transform: translateX(-100%);
    }


    .move-enter-active, .move-leave-active {
        transition: transform 2000ms;
    }

    .move-enter-active {
        transform: translateX(0px);
    }

    .move-leave-to {
        transform: translateX(100%);
    }

    .move-enter /* .fade-leave-active below version 2.1.8 */
    {
        transform: translateX(100%);
    }

    .video-wrapper {
        width: 230px;
        height: 140px;

        position: relative;
        float: left;
        margin-right:20px;
    }

    .video-btn {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .corners, .play-icon {
        pointer-events: none;
        transform-origin: 50% 50%;
        transition: transform 150ms;
    }

    .corners {
        position: absolute;
        top: 10px;
        left: 22px;
    }

    .play-icon {
        position: absolute;
        top: 20px;
        left: 70px;
    }

    a:hover .play-icon {
        transform: scale(1.1);
    }

    a:hover .corners {
        transform: scale(0.9);
    }

    @media screen and (max-width: 650px) {
        .video-wrapper {
            float: none;
            margin: auto;
            margin-bottom: 20px;
        }

        .action-buttons {
            text-align: center;
        }
    }

    .apple-icon {
        padding-top: 10px;
        padding-left: 10px;
    }

    .phone-icon {
        padding-top: 6px;
    }

    .label2 {
        margin-top: 10px;
    }

    .landing-button.select-spend {
        .wrap {
            line-height: 64px;
        }
    }
</style>
