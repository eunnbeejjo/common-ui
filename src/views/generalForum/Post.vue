<template>
  <v-container class="py-10">
    <v-row>
      <v-col>
        <h2>{{ postInfo.title }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col><span class="midFont">작성시간</span> <span class="lightFont">{{ postInfo.createAt }}</span></v-col>
      <v-col><span class="midFont">수정시간</span> <span class="lightFont">{{ postInfo.updateAt }}</span></v-col>
      <v-col><span class="midFont">조회수</span> <span class="lightFont">{{ postInfo.views }}</span></v-col>
      <v-col><span class="midFont">작성자</span> <span class="lightFont">{{ postInfo.userId }}</span></v-col>
    </v-row>
    <v-row>
      <v-col>
        카테고리 <v-chip v-for="(cate, index) in postInfo.category" :key="index" class="mr-1">{{ cate.categoryName }}</v-chip>
      </v-col>
    </v-row>
    <v-divider class="my-10" />
    <v-row>
      <v-col class="pa-5">
        <span v-html="postInfo.contents"></span>
      </v-col>
    </v-row>
    <v-divider class="mt-10 mb-3" />

    <v-row v-if="postInfo.attachmentsFlag === 'Y'">
      <v-col>
        <p>첨부파일</p>
      </v-col>
      <v-col>
<!--        Math.round(filename1.size/100)/10-->
        <a v-for="(i, index) in postInfo.attachments" :key="index"
           :href="i.locationPath" style="display: block">
          {{ i.attachmentsName }} ({{ Math.round(i.size/100)/10 }} kB)</a>
      </v-col>
    </v-row>

    <v-row v-if="!commentFlag">
      <v-col>
        <p style="text-align: center; color: #aaaaaa; font-size: 14px; margin-top: 30px;">댓글 작성이 제한된 게시글입니다.</p>
      </v-col>
    </v-row>
<v-divider v-if="commentFlag" class="mt-10 mb-3" />
<!--    댓글 리스트 -->
    <v-row v-if="commentFlag">
      <v-col>
        <ul class="px-10">
          <li v-for="(item, index) in commentList" :key="index" style="">
<!--            댓글 depth 버퍼 -->
            <div v-for="a in item.commentLayer" :key="a" style="float: left; width: 40px; height: 10px; margin-right: 5px;"></div>
            <div style="display: grid">
            <!-- div>
              <v-avatar :color="item.pfColor" size="36" class="my-2 mr-3" style="float: left">
                <span style="color: white; font-size: 14px; font-weight: bold">{{ item.profile }}</span>
              </v-avatar>
            </div -->
            <div>
<!--              댓글 정보 -->
              <h4>{{ item.userId }}</h4>
              <p class="mb-1">{{ item.contents }}</p>
              <p class="commentLightFont mr-3" style="display: inline-block">{{ item.updateAt }}</p>
<!--              <p class="commentLightFont mr-3" style="float: left">{{ item.commentGroup }}</p>-->
<!--              <p class="commentLightFont mr-3" style="float: left">{{ item.commentOrder }}</p>-->
<!--              <p class="commentLightFont mr-3" style="float: left">{{ item.commentLayer }}</p>-->
              <p class="commentLightFont" style="cursor: pointer; margin-right: 10px; display: inline-block" @click="addReply(index)">답글달기</p>
              <p v-if="item.userId == $store.state.boardStore.id" class="commentLightFont" style="cursor: pointer; margin-right: 10px; display: inline-block" @click="deleteComment(item)">삭제</p>
              <p v-if="item.userId == $store.state.boardStore.id" class="commentLightFont" style="cursor: pointer; margin-right: 10px; display: inline-block" @click="commentUpdate(item, index)">수정</p>
<!--              댓글 작성 -->
              <v-expand-transition>
<!--                댓글에 대한 답글 -->
              <div v-if="replyOpen === index">
                <v-card class="px-5 py-2" elevation="0" outlined>
                  <!--          댓글 작성자 ID -->
                  <h4>{{ item.userId }}</h4>
                  <v-textarea solo flat counter="30" v-model="reply" placeholder="댓글을 남겨보세요" rows="2" />
                  <v-btn @click="cancelReplyOpen">취소</v-btn>
                  <v-btn @click="createReply(item)">등록</v-btn>
                </v-card>
              </div>
              </v-expand-transition>
<!--              댓글 수정 -->
              <v-expand-transition>
                <!--                댓글에 대한 답글 -->
                <div v-if="replyUpdateOpen === index">
                  <v-card class="px-5 py-2" elevation="0" outlined>
                    <!--          댓글 작성자 ID -->
                    <h4>{{ item.userId }}</h4>
                    <v-textarea solo flat counter="30" v-model="reply" :rules="[rules.required, rules.counter]" maxlength="250" placeholder="댓글을 남겨보세요" rows="2" />
                    <v-btn @click="cancelReplyOpen">취소</v-btn>
                    <v-btn @click="updateComment(item)">등록</v-btn>
                  </v-card>
                </div>
              </v-expand-transition>
            </div>
            </div>
          </li>
        </ul>
      </v-col>
    </v-row>

<!--    댓글 작성 -->
    <v-row v-if="commentFlag">
      <v-col>
        <v-card class="px-5 py-2" elevation="0" outlined>
<!--          댓글 작성자 ID -->
          <h4>사용자 아이디 : {{ this.$store.state.boardStore.id }}</h4>
          <v-textarea solo flat counter="30" v-model="comment" :rules="[rules.required, rules.counter]" maxlength="250" placeholder="댓글을 남겨보세요" rows="2" />
          <v-btn @click="createComment">등록</v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="my-10" />
    <v-row>
      <v-col>
<!--        수정버튼은 작성자에게만 공개 -->
        <v-btn v-if="isWriter" @click="moveToUpdate">수정</v-btn>
        <v-btn v-if="isWriter" @click="deleteBoard">삭제</v-btn>
        <v-btn @click="$router.push('/general-forum')">목록</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from "../../router";

export default {
  name: 'Post',
  data() {
    return {
      reply: '',
      comment: '',
      reply2: false,
      replyOpen: null,
      replyUpdateOpen: null,
      comments: [],
      commentCount: [v => v.length <= 30 || '최대 30자 가능'],
      commentList: [
        {
          userId: '',
          updateAt: '',
          contents: '',
          commentGroup: '',
          commentOrder: '',
          commentLayer: '',
        }
      ],
      replyArr: [
        {
          userId: '',
          updateAt: '',
          contents: '',
          commentGroup: '',
          commentOrder: '',
          commentLayer: '',
        }
      ],
      postInfo: {
        title: '',
        createAt: '',
        updateAt: '',
        views: '',
        userId: '',
        categories: [],
        contents: "",
        attachmentsFlag: "",
        attachments: [
          {
            attachmentsId: '',
            attachmentsName: '',
            fileType: '',
            locationPath: '',
          }
        ],
      },
      isWriter: false,
      commentFlag: true,

      attachmentLink: '',

      rules: {
        required: value => !!value || '필수 입력 항목입니다.',
        counter: value => value.length <= 250 || '댓글은 최대 250자 이내로 작성해주세요.'
      },
    }
  },
  mounted() {
    this.getCommentList();
    this.getBoardDetail();
  },
  methods: {
    addReply(value) {
      this.replyOpen = value;
    },
    getBoardDetail() {
      this.$store.dispatch("boardStore/getBoardDetail", {
        boardId: this.$route.query.boardId,
        userId: this.$store.state.boardStore.id,
      }).then(response => {
        console.log(response, 'get board detail');
        this.postInfo = response.data;
        // 댓글 기능 사용 여부
        if(this.postInfo.commentFlag === 'N') {
          this.commentFlag = false;
        } else {
          this.commentFlag = true;
        }
        // 하나는 문자열, 하나는 숫자라서 !== 아닌 != 으로 했음, !== 쓰고싶으면 형변환해야함
        if(this.$store.state.boardStore.id != this.postInfo.userId) {
          this.isWriter = false;
        } else {
          this.isWriter = true;
        }
      })
    },
    moveToUpdate() {
      router.push({ path: '/update-post/'+this.$store.state.boardStore.id, query: { boardId: this.$route.query.boardId } });
    },
    deleteBoard() {
      this.$store.dispatch("boardStore/deleteBoard", {
        data: {
          boardId: this.$route.query.boardId,
          userId: this.$store.state.boardStore.id
        }
      }).then(response => {
        alert('게시물 삭제 완료!');
        router.push('/general-forum');
      })
    },
    getCommentList() {
      this.$store.dispatch("boardStore/getCommentList", {
        boardId: this.$route.query.boardId
      }).then(response => {
        this.commentList = response.data.list;
      })
    },
    createComment() {
      if(this.comment === '') {
        alert('댓글을 입력해주세요');
      } else if(this.comment !== '') {
        this.$store.dispatch("boardStore/createComment", {
          boardId: this.$route.query.boardId,
          userId: this.$store.state.boardStore.id,
          contents: this.comment,
        }).then(response => {
          this.getCommentList();
          this.comment = '';
        })
      }
    },
    createReply(value) {
      this.$store.dispatch("boardStore/createReply", {
        boardId: this.$route.query.boardId,
        userId: this.$store.state.boardStore.id,
        contents: this.reply,
        commentGroup: value.commentGroup,
        commentOrder: value.commentOrder,
        commentLayer: value.commentLayer,
      }).then(response => {
        this.getCommentList();
        this.replyOpen = null;
        this.reply = '';
      })
    },
    updateComment(value) {
      this.$store.dispatch("boardStore/updateComment", {
        commentId: value.commentId,
        boardId: this.$route.query.boardId,
        userId: this.$store.state.boardStore.id,
        contents: this.reply,
      }).then(response => {
        this.getCommentList();
        this.replyUpdateOpen = null;
        this.reply = '';
      })
    },
    commentUpdate(item, index) {
      this.replyUpdateOpen = index;
      this.reply = item.contents;
    },
    cancelReplyOpen() {
      this.replyOpen = null;
      this.replyUpdateOpen = null;
      this.reply = '';
    },
    deleteComment(value) {
      this.$store.dispatch("boardStore/deleteComment", {
        data: {
          commentId: value.commentId,
          boardId: this.$route.query.boardId,
          userId: this.$store.state.boardStore.id,
          commentGroup: value.commentGroup,
          commentOrder: value.commentOrder,
          commentLayer: value.commentLayer
        }
      }).then(response => {
        alert('댓글 삭제 완료')
        this.getCommentList();
      }).catch(error => {
        console.log('error', error);
        alert('댓글을 삭제할 수 없습니다.')
      })
    },
    getReplyConfirm(value) {
      this.$store.dispatch("boardStore/getReplyConfirm", {
        boardId: this.$route.query.boardId,
        commentGroup: value.commentGroup,
        commentOrder: value.commentOrder,
        commentLayer: value.commentLayer,
      }).then(response => {
        if(response.data === false) {
          // this.deleteComment(value);
          this.$store.dispatch("boardStore/deleteComment", {
            data: {
              commentId: value.commentId,
              boardId: this.$route.query.boardId,
              userId: this.$store.state.boardStore.id
            }
          }).then(response => {
            alert('댓글 삭제 완료')
            this.getCommentList();
          })
        } else {
          alert('답글이 달린 댓글/답글은 삭제 할 수 없습니다.');
        }
      })
    },
  },
}
</script>

<style scoped>
* {
  list-style: none;
}
v-treeview-node__content { display: block !important; }
span.midFont {
  font-size: 13px;
  color: #333;
  font-weight: bold;
}
span.lightFont {
  font-size: 13px;
  color: #333;
}
p.commentLightFont {
  font-size: 13px;
  color: #aaa;
  margin-bottom: 10px;
}
</style>