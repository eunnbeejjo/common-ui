<template>
  <v-container>
    <v-text-field placeholder="제목 입력해라" v-model="title"></v-text-field>
    <v-row>
      <v-col>
        <ckeditor v-model="contents" :editor="editor" @ready="onReady" style="height: 500px; border: 1px solid #ccc;"></ckeditor>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        카테고리
      </v-col>
      <v-col>
<!--        게시글 작성 시 카테고리 선택할 때에는 '전체' 항목 보여주지 않음 -->
        <v-combobox v-model="cateSelect" :items="cateGroup" placeholder="카테고리(최대 3개)" multiple
                    dense hide-details class="mr-2">
          <template v-slot:selection="{attrs, item, parent, selected}">
            <v-chip v-if="item === Object(item)" v-bind="attrs" :input-value="selected" small>
              <span>{{item.text}}</span>
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
      <v-col><v-checkbox v-model="pwActiveFlag" true-value="Y" false-value="N" label="비밀번호 사용" value="hasPassword"></v-checkbox></v-col>
      <v-col><v-text-field :disabled="pwActiveFlag === 'N'" v-model="password" type="password" placeholder="비밀번호 입력" autocomplete="new-password"></v-text-field></v-col>
    </v-row>
    <v-row>
      <v-col>댓글 사용 여부</v-col>
      <v-col>
        <v-checkbox v-model="commentFlag" true-value="Y" false-value="N" label="댓글 허용"></v-checkbox>
      </v-col>
      <v-col>게시물 공개 여부</v-col>
      <v-col>
        <v-checkbox v-model="privateFlag" true-value="Y" false-value="N" label="비공개"></v-checkbox>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="$router.push('/general-forum')">취소</v-btn>
        <v-btn @click="createBoard">저장</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from "../../router";
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import Ckeditor from '@ckeditor/ckeditor5-vue2';

export default {
  name: 'CreatePost',
  components: {
    'ckeditor': Ckeditor.component
  },
  data: () => ({
    title: '',
    contents: '',

    commentFlag: "Y",
    privateFlag: "N",
    pwActiveFlag: "N",
    password: '',

    attachments: "N",

    categoryId: [],
    cateSelectedStr: '',

    editor: DecoupledEditor,
    cateSelect: [],
    cateGroup: [{}],
  }),
  watch: {
    cateSelect (val) {
      if(val.length > 3) {
        this.$nextTick(() => this.cateSelect.pop());
        alert('카테고리는 3개까지 추가 가능합니다!');
      }
      this.cateSelectedStr = this.cateSelect.map(value => value.value);
    }
  },
  mounted() {
    this.getCategoryList();
  },
  methods: {
    onReady( editor ) {
      // Insert the toolbar before the editable area.
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
    },
    savePost() {
      alert('저장되었습니다!');
      router.push('/general-forum')
    },
    // 카테고리 List 조회
    getCategoryList() {
      this.$store.dispatch("boardStore/getCategoryList", {
      }).then(response => {
        this.cateGroup = response.data.list;
        this.cateGroup = this.cateGroup.map(function (obj) {
          obj['text'] = obj['categoryName'];
          obj['value'] = obj['categoryId'];
          delete obj['categoryName'];
          delete obj['categoryId'];
          return obj;
        })
        this.cateGroup.splice(0, 1);
      })
    },
    createBoard() {
      this.$store.dispatch("boardStore/createBoard", {
        userId: 1,
        title: this.title,
        contents: this.contents,
        pwActiveFlag: this.pwActiveFlag,
        password: this.password,
        attachmentsFlag: this.attachmentsFlag,
        privateFlag: this.privateFlag,
        categoryId: this.cateSelectedStr,
        commentFlag: this.commentFlag,
      }).then(response => {
        console.log(response, 'response');
      }).catch()
    },
  },
}
</script>

<style></style>