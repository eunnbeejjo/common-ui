<template>
<v-sheet>
  <v-row>
    <v-col cols="12">
      <v-card class="pa-5" elevation="0">
        <v-card-title class="text-h3 mb-5">게시판</v-card-title>
        <v-row>
          <v-col cols="3">
            <v-select v-model="selectedSearch" :items="search" item-text="text" item-value="value" dense hide-details style="width: 100px; float: left" class="mr-2"></v-select>
            <v-text-field dense hide-details placeholder="검색어 입력" v-model="searchWord" style="width: 200px; float: left"></v-text-field>
          </v-col>
          <v-col>
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
          <v-col cols="1">
            <v-btn @click="getSearchBoardList">조회</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-fade-transition leave-absolute>
              <v-skeleton-loader v-if="SKloading" type="table"></v-skeleton-loader>
            </v-fade-transition>
            <v-fade-transition leave-absolute>
            <v-data-table :headers="headers" :items="boardList" multi-sort :sort-desc="[false, true]"
                          :page.sync="page" :items-per-page="itemsPerPage" @page-count="pageCount = $event"
                          @click:row="postHasPw" v-show="!SKloading" :loading="SKloading">
              <template v-slot:item.title="{item}">
                <span>{{ item.title }}</span>
                <v-icon v-if="item.privateFlag === 'Y'" small class="ml-1">mdi-paperclip</v-icon>
                <v-icon v-if="item.pwActiveFlag === 'Y'" small class="ml-1">mdi-lock</v-icon>
              </template>
            </v-data-table>
            </v-fade-transition>
            <v-card-actions v-show="!SKloading" class="justify-center px-10">
              <v-pagination v-model="page" :length="pageCount"/>
              <v-select :value="itemsPerPage" label="게시글 표시 갯수" :items="pageGroup" @input="itemsPerPage = parseInt($event, 10)" hide-details></v-select>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="$router.push('/create-post')">게시물 작성</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</v-sheet>
</template>

<!--
유저 아이디 있으면 (헤더바에 표시) 게시판 목록 뿌려줄 수 있음
-->
<script>
import router from "../../router";

export default {
  name: 'GeneralForum',
  watch: {
    cateSelect (val) {
      if(val.length > 3) {
        this.$nextTick(() => this.cateSelect.pop());
        alert('카테고리는 3개까지 검색 가능합니다!');
      }
      this.cateSelectedStr = this.cateSelect.map(value => value.value).join();
      console.log(this.cateSelectedStr, 'qwerqerqerqw');
    }
  },
  props: {
    loading: {type: Boolean, default: true},
  },
  data() {
    return {
      SKloading: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      pageGroup: [5, 10, 15, 20],
      cateSelect: [{text: "전체", value: 1}],
      cateSelectedStr: '1',
      selectedSearch: 'all',
      search: [
        { text: '전체', value: 'all'},
        { text: '작성자', value: 'writer'},
        { text: '제목', value: 'title'},
        { text: '내용', value: 'contents'},
      ],
      searchWord: 'test',
      cateGroup: [{}],
      headers: [
        { text: 'No.', align: 'start', value: 'boardId', width: 70 },
        { text: '카테고리', value: 'category', width: 200 },
        { text: '제목', value: 'title', width: 250 },
        { text: '조회수', value: 'views' },
        { text: '사용자 아이디', value: 'userId' },
        { text: '수정일자', value: 'updateAt' },
      ],
      boardList: [],
    }
  },
  mounted() {
    this.resizeTableRow();
    this.getCategoryList();
    this.getBoardList();
  },
  methods: {
    resizeTableRow() {

      let tables = document.getElementsByTagName('table');
      for (let i=0; i<tables.length;i++){
        resizableGrid(tables[i]);
      }

      function resizableGrid(table) {
        let row = table.getElementsByTagName('tr')[0],
            cols = row ? row.children : undefined;
        if (!cols) return;

        table.style.overflow = 'hidden';

        let tableHeight = table.offsetHeight;

        for (let i = 0; i < cols.length; i++) {
          let div = createDiv(tableHeight);
          cols[i].appendChild(div);
          cols[i].style.position = 'relative';
          setListeners(div);
        }

        function setListeners(div) {
          let pageX, curCol, nxtCol, curColWidth, nxtColWidth;

          div.addEventListener('mousedown', function (e) {
            curCol = e.target.parentElement;
            nxtCol = curCol.nextElementSibling;
            pageX = e.pageX;

            let padding = paddingDiff(curCol);

            curColWidth = curCol.offsetWidth - padding;
            if (nxtCol)
              nxtColWidth = nxtCol.offsetWidth - padding;
          });

          div.addEventListener('mouseover', function (e) {
            e.target.style.borderRight = '2px solid #0000ff';
          })

          div.addEventListener('mouseout', function (e) {
            e.target.style.borderRight = '';
          })

          document.addEventListener('mousemove', function (e) {
            if (curCol) {
              let diffX = e.pageX - pageX;

              if (nxtCol)
                nxtCol.style.width = (nxtColWidth - (diffX)) + 'px';

              curCol.style.width = (curColWidth + diffX) + 'px';
              // console.log('curCol: ', curColWidth + diffX, 'nxtCol: ', nxtColWidth - (diffX));

              // let curColWidthDiff = curColWidth + diffX;
              // let nxtColWidthDiff = nxtColWidth - (diffX);
              localStorage.setItem('curColWidthDiff', curColWidth + diffX);
            }
          });

          document.addEventListener('mouseup', function () {
            curCol = undefined;
            nxtCol = undefined;
            pageX = undefined;
            nxtColWidth = undefined;
            curColWidth = undefined;
            // console.log('culCol: ', curCol, 'nxtCol: ', nxtCol, 'pageX: ', pageX, 'nxtColWidth: ', nxtColWidth, 'curColWidth: ', curColWidth);
          });
        }

        function createDiv(height) {
          let div = document.createElement('div');
          div.style.top = 0;
          div.style.right = 0;
          div.style.width = '5px';
          div.style.position = 'absolute';
          div.style.cursor = 'col-resize';
          div.style.userSelect = 'none';
          div.style.height = height + 'px';
          return div;
        }

        function paddingDiff(col) {

          if (getStyleVal(col, 'box-sizing') == 'border-box') {
            return 0;
          }

          let padLeft = getStyleVal(col, 'padding-left');
          let padRight = getStyleVal(col, 'padding-right');
          return (parseInt(padLeft) + parseInt(padRight));

        }

        function getStyleVal(elm, css) {
          return (window.getComputedStyle(elm, null).getPropertyValue(css))
        }
      }
    },
    postHasPw(row) {
      const tr = this.boardList.indexOf(row);
      let selectedPost = this.boardList[tr];
      console.log(selectedPost);
      this.$store.dispatch("boardStore/getBoardStatus", {
        boardId: selectedPost.boardId,
        userId: selectedPost.userId,
      }).then(response => {
        console.log(response);
        let status = response.data.status;
        if(status === "me") {
          console.log(status, '내 글')
        } else if(status === "other") {
          console.log(status, '남의 글')
        } else {
          console.log(status, '비밀번호 있음')
        }
      })

      this.$store.dispatch("boardStore/getBoardDetail", {
        boardId: selectedPost.boardId,
        userId: selectedPost.userId,
      }).then(response => {
        console.log(response, 'board detail');
      })

      if(this.boardList[tr].pwActiveFlag === "Y") {
        router.push('/post-pw')
      } else {
        router.push('/post')
      }
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
      })
    },
    // 초기 게시글 List 조회
    getBoardList() {
      this.$store.dispatch("boardStore/getBoardList", {
        userId: 1,
      }).then(response => {
        this.boardList = response.data.list;
        for(let a in response.data.list) {
          this.boardList[a].category = response.data.list[a].category.map(value => value.categoryName);
        }
      }).catch(error => {
        console.log("error", error);
      })
          .finally(() => {
            this.SKloading = false;
          }
      )
    },
    getSearchBoardList() {
      this.$store.dispatch("boardStore/getSearchBoardList", {
        userId: 1,
        // 검색조건
        searchStatus: this.selectedSearch,
        // 검색어
        searchValue: this.searchWord,
        // 카테고리 선택
        categoryIdList: this.cateSelectedStr,
      }).then(response => {
        this.boardList = response.data.list;
        for(let a in response.data.list) {
          this.boardList[a].category = response.data.list[a].category.map(value => value.categoryName);
        }
      }).catch()
    },
  },
}
</script>

<style>
tr > td {
  max-width: 1px;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
th, td {
  border-right: 1px solid transparent;
}
</style>