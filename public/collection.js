var app = new Vue({
  el: '#collection',
  data: {
    scriptures: [],
    editVerse: "",
    editPassage: "",
    editNotes: "",
    link:"",
  },

  methods: {
    async getScriptures() {
      try {
        let response = await axios.get("/api/scriptures");
        this.scriptures = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteVerse(verse) {
      try {
        let response = axios.delete("/api/scriptures/" + verse._id);
        this.getScriptures();
        return true;
      } catch (error) {
        console.log(error);
      }
    },


    async editingVerse(verse) {
      //this.disableEdit();
      this.enableEdit(verse);
    },

    async disableEdit() {
      for (var i = 0; i < this.scriptures.length; i++)
      {
        let ref = this.scriptures[i];
        try {
          let r = axios.put("/api/scriptures/" + ref._id, {
            verse: ref.verse,
            passage: ref.passage,
            notes: ref.notes,
            editing: false,
          });
          console.log(i + ": " + this.scriptures[i].editing);
        } catch (error) {
          console.log(error);
        }
      }
      return true;
    },

    async enableEdit(verse) {
      this.editVerse = verse.verse;
      this.editPassage = verse.passage;
      this.editNotes = verse.notes;

      try {
        let response = axios.put("/api/scriptures/" + verse._id, {
          verse: verse.verse,
          passage: verse.passage,
          notes: verse.notes,
          editing: true,
        });
        this.getScriptures();
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async changeVerse(verse) {
      try {
        let response = axios.put("/api/scriptures/" + verse._id, {
          verse: this.editVerse,
          passage: this.editPassage,
          notes: this.editNotes,
          editing: false,
        });
        this.getScriptures();
        return true;
      } catch (error) {
        console.log(error);
      }
    },

  },

  created() {
    this.getScriptures();
  }
});
