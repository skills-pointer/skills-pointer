class RecommendAColleague {
  constructor(service, selector) {
    this.service = service;
    this.$root = $(selector);
    this.init();
  }

  init() {
    let html=`
      <p>Mon coll&egrave;gue
      <input class="name" type="text" placeholder="ex: Marie">
      m'a aid&eacute; avec
      <input class="skill" type="text" placeholder="ex : angular">
      <button>recommander</button>
      </p>
      <div class="message" style="display:none"></div>`;
    this.$root.append(html);
    this.$root.find('button').click(()=>this.recommend());
  }

  recommend() {
    let $skill = this.$root.find('.skill');
    let skill = $skill.val();
    if (skill) {
      let $name = this.$root.find('.name');
      let name = $name.val();
      let candidates = service.findPersons(name);
      let recommendee = candidates.length ? candidates[0] : service.createPerson(name);
      this.service.recommend(user.id, recommendee.id, skill);

      $name.val('');
      $skill.val('');
      
      let $result=this.$root.find('.message');
      $result.fadeIn(200);
      $result.html(`Vous avez recommandé <b>${name}</b> pour <b>${skill}</b>`);
      $result.fadeOut(4000);
    }
  }
}