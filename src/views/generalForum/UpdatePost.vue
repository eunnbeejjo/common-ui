<template>
  <v-container>
    <v-row>
      <v-col cols="1"><span>제목</span></v-col>
      <v-col>
        <v-text-field v-model="postInfo.title" placeholder="제목 입력해라"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ckeditor v-model="postInfo.content" :editor="editor" :config="postInfo.config" @ready="onReady" style="height: 500px; border: 1px solid #ccc; border-top: none;"></ckeditor>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        카테고리
      </v-col>
      <v-col>
        <v-combobox v-model="cateSelect" :items="categoriesGroup" placeholder="카테고리(최대 3개)" multiple
                    dense hide-details class="mr-2">
          <template v-slot:selection="{attrs, item, parent, selected}">
            <v-chip v-if="item === Object(item)" v-bind="attrs" :input-value="selected" small>
              <span>{{ item.text }}</span>
              <v-icon @click="parent.selectItem(item)" small>mdi-close</v-icon>
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
    </v-row>
    <v-row>
      <v-col>파일 첨부</v-col>
      <v-col><v-file-input></v-file-input></v-col>
    </v-row>
    <v-row>
      <v-col><v-checkbox v-model="usePassword" label="비밀번호 사용" value="hasPW"></v-checkbox></v-col>
      <v-col><v-text-field :disabled="!usePassword" v-model="postInfo.password" type="password" placeholder="비밀번호 입력" autocomplete="new-password"></v-text-field></v-col>
    </v-row>
    <v-row>
      <v-col>댓글 사용 여부</v-col>
      <v-col>
        <v-radio-group v-model="commentAllow" row>
          <v-radio value="allowComment" label="댓글 허용"></v-radio>
          <v-radio value="noComment" label="댓글 허용 안함"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col>게시물 공개 여부</v-col>
      <v-col>
        <v-radio-group v-model="disclosurePost" row>
          <v-radio value="publicPost" label="공개"></v-radio>
          <v-radio value="privatePost" label="비공개"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="$router.push('/post')">취소</v-btn>
        <v-btn @click="savePost">저장</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from "../../router";
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/ko';
import Ckeditor from '@ckeditor/ckeditor5-vue2';
// import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter'

export default {
  name: 'UpdatePost',
  components: {
    ckeditor: Ckeditor.component,
  },
  data: () => ({
    commentAllow: 'allowComment',
    disclosurePost: 'publicPost',
    usePassword: false,

    editor: DecoupledEditor,
    cateSelect: null,
    categoriesGroup: [
      { text: "스포츠" },
      { text: "게임" },
      { text: "공부" },
      { text: "업무" },
      { text: "카테고리이름이길수도있으니까" },
      { text: "세상은넓고카테고리는길다" },
      { text: "커피에얼음을퐁당퐁당" },
      { text: "동해물과백두산이마르고닳도록하느님이보우하사" },
    ],
    postInfo: {
      password: 'password12345',
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
      config: { language: 'ko' },
      content: "게시물의 내용이 표시됩니다람쥐<br><br>게시글이 길수도 있자나여?<br><br>죄송한데🤢대머리가👴🏻 의견을 🔉낼 수도 있나요? 🤔<br><br>자기 머리카락도♀ 못내밀면서 내밀면서 ♀의견을 낸다는게 을 낸다는게 💇‍다는게 💇‍🤦‍🤦‍💇‍🤦‍🤐게 💇‍🤦‍🤐면서<br>♀의견을 낸다는게 🤦‍🤐견을 낸다는게 🤐좀 말이 안되지않나요? 머리가 하도 나빠서👎 머리카락들이 도망간게🏃♂흙에서 식물이🏻‍🧟‍🌳?<br>영양분 없는♂ 썩어문드러진 흙에서 식물이🧟‍🌳썩어문드러진 흙에서 식물이🌳죽어버리듯이... 🍃와꾸가 썩어문드러져🌚 대가리에도 든게 없는게 🤯아닐까요?😭<br>빠져버린 머리카락처럼👴🏻 지금 문제에서도👩‍🏫 빠져주실래요?🏃♂<br>계속 참견을🏻‍🗣계속 참견을🗣 해대서 머리카락도 ☝일종의 경고☝로 빠져버린게 아닐까 싶네요😔<br><br>🚨🚨🚨🚨🚨애애애애애앵‼️‼️‼️‼️‼️‼️🚨🚨🚨🚨🚨🚨<br>📢📢📢📢📢📢📢긴급상황‼️‼️‼️긴급상황‼️‼️‼️‼️‼️📢📢📢📢📢📢📢<br>🔊🔊🔊🔊🔊🔊‼️‼️‼️🔊🔊🔊🔊🔊🔊🔊🔊🔊<br>🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥<br>🛎🛎🛎🛎🛎🛎🛎모두주목해주세요땡땡땡땡땡🛎🛎🛎🛎🛎<br>🎤🎤🎤🎤아아-마이크테스트-!마이크테스트-!🎤🎤🎤🎤<br>🎙🎙🎙🎙🎙마이크테스트— 들린다면 응답하라—-🎙🎙🎙🎙🎙<br>📣📣📣📣<br><br>📯📯📯뿌〰️아이고 깜짝이야😵어?핑핑아🐌오늘이 무슨요일이야?<br>먀~🐌<br>월요일?😲아~월요일🎷월요일🌝좋아〰️🙆‍♀️최고로 좋아〰️🙆‍♀<br>️난🧀일할때🍔제일 멋지지😎오늘부터💪열심히🧠할거야<br>오좋아💩월요일 좋아〰️🛁같이 불러🎙<br>핑핑아🐌냔냔냐냐냐〰️냔냔냐냐냐〰<br>️월요일🎶월요일🎶월요일🥁월요일 좋아〰<br>️🦑제발 좀 조용히해🤬<br>월요일이 좋아서 난리떠는🤸‍♀️멍청이는 이세상에 너뿐🧀일꺼야🗿<br>⭐️월요일 좋아<br>🦑맙소사<br>🤯진짜 맛있는 날이야💨<br>🦑제발 그만 해💦<br>냠냠 게살버거 넌 세🍔개🍔먹어🍔오예 노래하자🎤<br>내월요일🧀좋아〰️월요일<br>🦑좋아⭐️〰<br><br><br>🌈무지개반사🌌우주반사🏅절대반사🌚블랙홀반사🙌🏻자동반사💎크리스탈반사👑슈퍼울트라반사🐉흑염룡반사<br>💫안드로메다반사☃️알래스카반사🐺시베리아허스키반사🌞복사열반사👻유령반사👾외계인반사🤖인공지능반사<br>⚜️제우스반사🎵리듬에몸을맡기고반사👺느개비반사👁호루스의눈반사🖕법규반사🕴무중력반사🌪허리케인반사<br>",
    },
  }),
  methods: {
    hasPassword() {
      if(this.postInfo.password != null) {
        console.log('비밀번호있고');
        return true;
      }
    },
    onReady( editor ) {
      // Insert the toolbar before the editable area.
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
    },
    savePost() {
      alert('수정되었습니다!');
      router.push('/post')
    },
  },
}
</script>