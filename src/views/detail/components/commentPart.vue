<template>
  <div class="comment-part">
    <img
      class="comment-avatar"
      src="https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/s28447008.jpg"
      alt=""
    />
    <div class="comment-content">
      <div class="comment-content-top">AAAA辣椒炒肉董事长</div>
      <div class="comment-content-middle">
        啊打发打发单纯的，大幅度反对法大幅度的手段？对付大苏打真的有用吗。的撒法地方沙发沙发沙发的发射点
      </div>
      <div class="comment-content-data">昨天 07:06 云南 回复</div>
    </div>
    <div class="comment-like">
      <van-icon name="like-o" />
      <div class="comment-like-num">67</div>
    </div>
  </div>
  <div v-if="true" class="reply-num"><span style="color: #ccc">一</span> 展开7条回复</div>
  <div v-else class="reply-part">
    <img
      class="reply-avatar"
      src="https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/e69858186deb93429436ec0b194e3967_720.jpg"
      alt=""
    />
    <div class="reply-content">
      <div class="reply-content-top">BBBB火鸡面董事长</div>
      <div class="reply-content-middle">啊打发打发单纯的，大幅度反对法发沙发沙发的发射点</div>
      <div class="reply-content-data">昨天 11:46 美国 回复</div>
    </div>
    <div class="reply-like">
      <van-icon name="like-o" />
      <div class="reply-like-num">67</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.comment-part {
  //   background-color: palegoldenrod;
  margin-top: 14px;
  display: flex;
  &:nth-child(1) {
    margin-top: 0;
  }
  //   justify-content: space-between;
  .comment-avatar {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    overflow: hidden;
  }
  .comment-content {
    margin-left: 10px;
    width: 78%;
    font-size: 14px;
    color: black;
    .comment-content-top {
      font-size: 12px;
      color: #8a8a8a;
      margin-bottom: 2px;
    }
    .comment-content-data {
      margin-top: 2px;
      font-size: 11px;
      color: #ccc;
      color: #8a8a8a;
    }
  }
  .comment-like {
    margin-left: auto;
    margin-right: 0;
    width: 20px;
    // background-color: slateblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #8a8a8a;

    .van-icon {
      //   color: aqua;
      font-size: 18px;
    }
    .comment-like-num {
      //   color: #6e6e6e;
      font-size: 12px;
      margin-top: 2px;
    }
  }
}
.reply-num {
  margin-left: 36px;
  font-size: 12px;
  color: #388aef;
  margin-top: 3px;
}
.reply-part {
  display: flex;
  margin-top: 9px;
  margin-left: 36px;
  font-size: 14px;
  color: black;
  //   background-color: sandybrown;
  .reply-avatar {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    overflow: hidden;
  }
  .reply-content {
    margin-left: 5px;
    width: 78%;
    font-size: 14px;
    color: black;
    .reply-content-top {
      font-size: 11px;
      color: #8a8a8a;
      margin-bottom: 2px;
    }
    .reply-content-data {
      margin-top: 4px;
      font-size: 11px;
      color: #ccc;
      color: #8a8a8a;
    }
  }
  .reply-like {
    margin-left: auto;
    margin-right: 0;
    width: 20px;
    // background-color: slateblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #8a8a8a;

    .van-icon {
      //   color: aqua;
      font-size: 18px;
    }
    .reply-like-num {
      //   color: #6e6e6e;
      font-size: 12px;
      margin-top: 2px;
    }
  }
}
</style>
