var app = new Vue({
  el: '#app',
  data: {
    verse: "",
    scriptures: [],
    passage: "",
    findVerse: "",
    notes: "",
    addVerse: null,
  },

  methods: {
    async upload() {
      try {
        let r = await axios.post('/api/scriptures', {
          verse: this.verse,
          passage: this.passage,
          notes: this.notes,
        });
        this.addVerse = r.data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    suggestions() {
      return this.scriptures.filter(verse => verse.title.toLowerCase().startsWith(this.findVerse.toLowerCase()));
    }
  },
});
