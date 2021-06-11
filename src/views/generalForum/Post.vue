<template>
  <v-container class="py-10">
    <!-- v-row>
      게시글 아이디(seq)
      내용
      첨부파일
      댓글(댓글의 댓글)

      수정

      댓글 - 작성자, 상세내용
    </v-row -->
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
        카테고리 <v-chip v-for="(cate, index) in postInfo.categories" :key="index" class="mr-1">{{ cate.text }}</v-chip>
      </v-col>
    </v-row>
    <v-divider class="my-10" />
    <v-row>
      <v-col class="pa-5">
        <span v-html="postInfo.contents"></span>
      </v-col>
    </v-row>
    <v-divider class="mt-10 mb-3" />
<!--    댓글 리스트1 (children) -->
    <!-- v-row>
      <v-col>
        <v-treeview v-model="comments" open-all hoverable :items="items">
          <template v-slot:prepend="{ item }">
            <div style="position: absolute;">
              <v-avatar :color="item.pfColor" size="36" class="my-2 mr-2" style="float: left">
                <span style="color: white; font-size: 14px; font-weight: bold">{{ item.profile }}</span>
              </v-avatar>
            </div>
            <div style="padding-left: 50px;">
              <v-row>
                <v-col>
                  <h4>{{ item.id }}</h4>
                  <p class="mb-1">{{ item.comment }}</p>
                  <p class="commentLightFont mr-3" style="float: left;">{{ item.createdAt }}</p>
                  <p class="commentLightFont" style="cursor: pointer;" @click="reply = true">답글달기</p>
                </v-col>
              </v-row>
            </div>
          </template>
        </v-treeview>
      </v-col>
    </v-row -->

<v-divider class="mt-10 mb-3" />
<!--    댓글 리스트2 (depth) -->
    <v-row>
      <v-col>
        <ul class="px-10">
          <li v-for="item in items2" style="">
<!--            댓글 depth 버퍼 -->
            <div v-for="a in item.depth" :key="a" style="float: left; width: 40px; height: 10px; margin-right: 5px;"></div>
            <div style="display: flex">
            <div>
              <v-avatar :color="item.pfColor" size="36" class="my-2 mr-3" style="float: left">
                <span style="color: white; font-size: 14px; font-weight: bold">{{ item.profile }}</span>
              </v-avatar>
            </div>
            <div>
              <h4>{{ item.id }}</h4>
              <p class="mb-1">{{ item.comment }}</p>
              <p class="commentLightFont mr-3" style="float: left">{{ item.createdAt }}</p>
              <p class="commentLightFont" style="cursor: pointer;" @click="reply2 = true">답글달기</p>
              <v-expand-transition>
              <div v-if="reply2">
                <v-card class="px-5 py-2" elevation="0" outlined>
                  <!--          댓글 작성자 ID -->
                  <h4>eunnbeejjo</h4>
                  <v-textarea solo flat counter="30" placeholder="댓글을 남겨보세요" rows="1" />
                  <v-btn @click="reply2 = false">등록</v-btn>
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
    <v-row>
      <v-col>
        <v-card class="px-5 py-2" elevation="0" outlined>
<!--          댓글 작성자 ID -->
          <h4>eunnbeejjo</h4>
          <v-textarea solo flat counter="30" placeholder="댓글을 남겨보세요" rows="1" />
          <v-btn>등록</v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="my-10" />
    <v-row>
      <v-col>
<!--        수정버튼은 작성자에게만 공개 -->
        <v-btn @click="isWriter">수정</v-btn>
        <v-btn @click="$router.push('/general-forum')">목록</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Post',
  data() {
    return {
      reply: false,
      reply2: false,
      comments: [],
      commentCount: [v => v.length <= 30 || '최대 30자 가능'],
      items2: [
        {
          depth: 0,
          id: 'name1',
          profile: 'EB',
          pfColor: 'pink',
          createdAt: '2021.05.25 15:45:15',
          comment: '2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.'
        },
        {
          depth: 0,
          id: 'name1',
          profile: 'AA',
          pfColor: 'brown',
          createdAt: '2021.05.25 15:45:15',
          comment: '댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. ',
        },
        {
          depth: 1,
          id: 'name1',
          profile: 'CC',
          pfColor: 'cyan',
          createdAt: '2021.05.25 15:45:15',
          comment: '댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. ',
        },
        {
          depth: 2,
          id: 'name1',
          profile: 'WE',
          pfColor: 'orange',
          createdAt: '2021.05.25 15:45:15',
          comment: '댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. ',
        },
        {
          depth: 3,
          id: 'name1',
          profile: 'GH',
          pfColor: 'blue',
          createdAt: '2021.05.25 15:45:15',
          comment: '댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. ',
        },
        {
          depth: 1,
          id: 'name1',
          profile: 'UY',
          pfColor: 'green',
          createdAt: '2021.05.25 15:45:15',
          comment: '댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. ',
        },
        {
          depth: 1,
          id: 'name1',
          profile: 'SW',
          pfColor: 'purple',
          createdAt: '2021.05.25 15:45:15',
          comment: '댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. ',
        },
        {
          depth: 2,
          id: 'name1',
          profile: 'JH',
          pfColor: 'black',
          createdAt: '2021.05.25 15:45:15',
          comment: '2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.',
        },
      ],
      items: [
        {
          id: 'name1',
          profile: 'EB',
          pfColor: 'pink',
          createdAt: '2021.05.26 15:55:55',
          comment: '댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. 댓글내용입니다요. ',
        },
        {
          id: 'name2',
          profile: 'GP',
          pfColor: 'brown',
          createdAt: '2021.05.26 15:55:55',
          comment: '2번이 쓴 댓글입니다잉',
          children: [
            {
              id: 'name2-1',
              profile: 'HJ',
              pfColor: 'green',
              createdAt: '2021.05.26 15:55:55',
              comment: '2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인 것이죠',
              children: [
                {
                  id: 'name2-1-1',
                  profile: 'SJ',
                  pfColor: 'orange',
                  createdAt: '2021.05.26 15:55:55',
                  comment: 'I got bored bout writing these down, let everything goes well :-)'
                }
              ],
            },
            {
              id: 'name2-2',
              profile: 'GH',
              pfColor: 'blue',
              createdAt: '2021.05.26 15:55:55',
              comment: '2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.2번이 쓴 댓글에 답글을 단 것입니다. 즉 댓글의 답글인데 답글 중 2번째.'
            },
          ]
        },
      ],
      postInfo: {
        title: '',
        createAt: '',
        updateAt: '',
        views: '',
        userId: '',
        categories: [],
        contents: "",
      },
    }
  },
  mounted() {
    this.getBoardDetail();
  },
  methods: {
    getBoardDetail() {
      this.$store.dispatch("boardStore/getBoardDetail", {
        boardId: 1,
        userId: 1,
      }).then(response => {
        console.log(response, 'response');
        let post = response.data;
        this.postInfo = post;
        console.log(post, 'post');
      })
    },
    isWriter() {
      // if(this.postInfo.userId === userId)
      // return true;
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