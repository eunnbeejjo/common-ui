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
      <v-col><span class="midFont">작성시간</span> <span class="lightFont">{{ postInfo.createdAt }}</span></v-col>
      <v-col><span class="midFont">수정시간</span> <span class="lightFont">{{ postInfo.editedAt }}</span></v-col>
      <v-col><span class="midFont">조회수</span> <span class="lightFont">{{ postInfo.watched }}</span></v-col>
      <v-col><span class="midFont">작성자</span> <span class="lightFont">{{ postInfo.writer }}</span></v-col>
    </v-row>
    <v-row>
      <v-col>
        카테고리 <v-chip v-for="(cate, index) in postInfo.categories" :key="index" class="mr-1">{{ cate.text }}</v-chip>
      </v-col>
    </v-row>
    <v-divider class="my-10" />
    <v-row>
      <v-col class="pa-5">{{ postInfo.content }}</v-col>
    </v-row>
    <v-divider class="mt-10 mb-3" />
<!--    댓글 리스트1 (children) -->
    <v-row>
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
    </v-row>

<v-divider class="mt-10 mb-3" />
<!--    댓글 리스트2 (depth) -->
    <v-row>
      <v-col>
        <ul class="px-10">
          <li v-for="item in items2" style="">
<!--            댓글 depth 버퍼 -->
            <div v-for="a in item.depth" :key="a" style="float: left; width: 40px; height: 100px; margin-right: 5px;"></div>
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
        <v-btn @click="$router.push('/update-post')">수정</v-btn>
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
        title: '우당탕탕 고구미말래미',
        createdAt: '2021.05.26 15:55:55',
        editedAt: '2021.05.27 13:15:51',
        watched: '1123',
        writer: '곽두팔',
        categories: [
          { text: "카테고리이름이길수도있으니까" },
          { text: "세상은넓고카테고리는길다" },
          { text: "커피에얼음을퐁당퐁당" }
        ],
        content: "게시물의 내용이 표시됩니다람쥐<br><br>게시글이 길수도 있자나여?<br><br>죄송한데🤢대머리가👴🏻 의견을 🔉낼 수도 있나요? 🤔<br><br>자기 머리카락도♀ 못내밀면서 내밀면서 ♀의견을 낸다는게 을 낸다는게 💇‍다는게 💇‍🤦‍🤦‍💇‍🤦‍🤐게 💇‍🤦‍🤐면서<br>♀의견을 낸다는게 🤦‍🤐견을 낸다는게 🤐좀 말이 안되지않나요? 머리가 하도 나빠서👎 머리카락들이 도망간게🏃♂흙에서 식물이🏻‍🧟‍🌳?<br>영양분 없는♂ 썩어문드러진 흙에서 식물이🧟‍🌳썩어문드러진 흙에서 식물이🌳죽어버리듯이... 🍃와꾸가 썩어문드러져🌚 대가리에도 든게 없는게 🤯아닐까요?😭<br>빠져버린 머리카락처럼👴🏻 지금 문제에서도👩‍🏫 빠져주실래요?🏃♂<br>계속 참견을🏻‍🗣계속 참견을🗣 해대서 머리카락도 ☝일종의 경고☝로 빠져버린게 아닐까 싶네요😔<br><br>🚨🚨🚨🚨🚨애애애애애앵‼️‼️‼️‼️‼️‼️🚨🚨🚨🚨🚨🚨<br>📢📢📢📢📢📢📢긴급상황‼️‼️‼️긴급상황‼️‼️‼️‼️‼️📢📢📢📢📢📢📢<br>🔊🔊🔊🔊🔊🔊‼️‼️‼️🔊🔊🔊🔊🔊🔊🔊🔊🔊<br>🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥<br>🛎🛎🛎🛎🛎🛎🛎모두주목해주세요땡땡땡땡땡🛎🛎🛎🛎🛎<br>🎤🎤🎤🎤아아-마이크테스트-!마이크테스트-!🎤🎤🎤🎤<br>🎙🎙🎙🎙🎙마이크테스트— 들린다면 응답하라—-🎙🎙🎙🎙🎙<br>📣📣📣📣<br><br>📯📯📯뿌〰️아이고 깜짝이야😵어?핑핑아🐌오늘이 무슨요일이야?<br>먀~🐌<br>월요일?😲아~월요일🎷월요일🌝좋아〰️🙆‍♀️최고로 좋아〰️🙆‍♀<br>️난🧀일할때🍔제일 멋지지😎오늘부터💪열심히🧠할거야<br>오좋아💩월요일 좋아〰️🛁같이 불러🎙<br>핑핑아🐌냔냔냐냐냐〰️냔냔냐냐냐〰<br>️월요일🎶월요일🎶월요일🥁월요일 좋아〰<br>️🦑제발 좀 조용히해🤬<br>월요일이 좋아서 난리떠는🤸‍♀️멍청이는 이세상에 너뿐🧀일꺼야🗿<br>⭐️월요일 좋아<br>🦑맙소사<br>🤯진짜 맛있는 날이야💨<br>🦑제발 그만 해💦<br>냠냠 게살버거 넌 세🍔개🍔먹어🍔오예 노래하자🎤<br>내월요일🧀좋아〰️월요일<br>🦑좋아⭐️〰<br><br><br>🌈무지개반사🌌우주반사🏅절대반사🌚블랙홀반사🙌🏻자동반사💎크리스탈반사👑슈퍼울트라반사🐉흑염룡반사<br>💫안드로메다반사☃️알래스카반사🐺시베리아허스키반사🌞복사열반사👻유령반사👾외계인반사🤖인공지능반사<br>⚜️제우스반사🎵리듬에몸을맡기고반사👺느개비반사👁호루스의눈반사🖕법규반사🕴무중력반사🌪허리케인반사<br>",
      },
    }
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