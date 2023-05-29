import Vue from 'vue';
import Component from 'vue-class-component';
@Component
export class TagHelper extends Vue {
    createTag() {
        const names = window.prompt("请输入标签名");
        if (names) {
            this.$store.commit('createTag', names)
        }
    }
}
export default TagHelper;