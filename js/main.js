// Goodest Goodbye — Main JS

// ── MOBILE NAV ──
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('navDrawer');

  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      const isOpen = drawer.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.textContent = isOpen ? 'Close' : 'Menu';
    });

    // Close drawer when a link inside it is clicked
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        drawer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
      });
    });

    // Close drawer on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
        toggle.focus();
      }
    });

    // Close drawer when clicking outside
    document.addEventListener('click', function (e) {
      if (drawer.classList.contains('open') &&
          !drawer.contains(e.target) &&
          !toggle.contains(e.target)) {
        drawer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
      }
    });
  }
});

// ── QUALITY OF LIFE TOOL ──
const toolQuestions = [
  {
    dimension: 'Comfort',
    question: 'Does your pet show signs of pain or physical discomfort?',
    context: 'Look for: vocalizing unprompted, guarding a body part when touched, reluctance to be touched, panting while at rest, a hunched posture, or a changed facial expression.',
    options: [
      { label: 'Consistently — pain or discomfort appears to be a constant presence', score: 0 },
      { label: 'Often — noticeable most days, though some moments are easier', score: 1 },
      { label: 'Sometimes — some difficult moments, but not the overall picture', score: 2 },
      { label: 'Rarely — occasional signs, but generally appears comfortable', score: 3 },
      { label: 'Not at all — no signs of pain or discomfort', score: 4 },
    ],
    weight: 1.5
  },
  {
    dimension: 'Comfort',
    question: 'Is your pet able to find a comfortable resting position?',
    context: 'Pets in pain often shift frequently, avoid lying down, or choose positions that seem effortful. A pet who settles and stays settled is generally more comfortable.',
    options: [
      { label: 'No — they seem unable to find comfort regardless of position', score: 0 },
      { label: 'With difficulty — they settle eventually but it takes effort', score: 1 },
      { label: 'Sometimes — some positions work, others seem difficult', score: 2 },
      { label: 'Mostly — they settle without much trouble', score: 3 },
      { label: 'Yes — they rest easily and stay settled', score: 4 },
    ],
    weight: 1
  },
  {
    dimension: 'Eating and drinking',
    question: 'How is your pet eating compared to their normal baseline?',
    context: 'Focus on actual intake, not enthusiasm. A pet who eats half their meal is different from one who refuses food entirely. Factor in any appetite-stimulating medications.',
    options: [
      { label: 'Refusing food entirely', score: 0 },
      { label: 'Eating less than a quarter of a normal meal', score: 1 },
      { label: 'Eating roughly half of a normal meal', score: 2 },
      { label: 'Eating most of a normal meal with some encouragement', score: 3 },
      { label: 'Eating normally or near-normally', score: 4 },
    ],
    weight: 1
  },
  {
    dimension: 'Eating and drinking',
    question: 'Is your pet drinking enough water?',
    context: 'Dehydration is a serious concern in declining pets. Signs include dry or tacky gums, lethargy, and skin that does not spring back quickly when gently pinched.',
    options: [
      { label: 'Not drinking at all, or showing signs of dehydration', score: 0 },
      { label: 'Drinking very little', score: 1 },
      { label: 'Drinking some, but noticeably less than usual', score: 2 },
      { label: 'Drinking close to their normal amount', score: 3 },
      { label: 'Drinking normally', score: 4 },
    ],
    weight: 1
  },
  {
    dimension: 'Hygiene and dignity',
    question: 'Is your pet able to maintain basic physical dignity?',
    context: 'This includes: ability to move away from their own waste, absence of bedsores or pressure wounds from immobility, and whether they appear distressed by their physical condition.',
    options: [
      { label: 'No — they are regularly lying in waste or have sores from immobility', score: 0 },
      { label: 'Often struggling — this is a frequent issue', score: 1 },
      { label: 'Sometimes — occasional accidents or difficulty, but manageable', score: 2 },
      { label: 'Mostly — minor issues but their dignity is largely intact', score: 3 },
      { label: 'Yes — no significant hygiene concerns', score: 4 },
    ],
    weight: 1
  },
  {
    dimension: 'Mobility',
    question: 'Can your pet reach the things they need — water, food, a comfortable spot?',
    context: 'Scale this to your pet\'s current condition, not their healthy baseline. The question is whether they can access what they need for basic daily life.',
    options: [
      { label: 'No — they cannot move to meet their basic needs without help', score: 0 },
      { label: 'With great difficulty — movement is labored and often unsuccessful', score: 1 },
      { label: 'With some difficulty — they manage but it takes visible effort', score: 2 },
      { label: 'Mostly — some limitation but generally able to get where they need to go', score: 3 },
      { label: 'Yes — mobility is not a significant limitation right now', score: 4 },
    ],
    weight: 1
  },
  {
    dimension: 'Mobility',
    question: 'How does your pet respond when you approach or interact with them?',
    context: 'A pet who lifts their head, makes eye contact, shifts toward you, or shows any physical acknowledgment of your presence is demonstrating engagement with the world.',
    options: [
      { label: 'No response — they do not react to my presence', score: 0 },
      { label: 'Minimal — a flicker of awareness at most', score: 1 },
      { label: 'Some — they acknowledge me but response is limited', score: 2 },
      { label: 'Clear — they respond to me, though less than before', score: 3 },
      { label: 'Normal or near-normal — their response to me is unchanged', score: 4 },
    ],
    weight: 1
  },
  {
    dimension: 'Happiness and connection',
    question: 'Does your pet still show interest in things that used to matter to them?',
    context: 'This might be a favorite toy, the sound of their leash, a spot by the window, food smells, or the arrival of a family member. Any sign of interest counts.',
    options: [
      { label: 'No — they show no interest in anything that used to engage them', score: 0 },
      { label: 'Rarely — a faint response occasionally, but mostly absent', score: 1 },
      { label: 'Sometimes — occasional moments of interest', score: 2 },
      { label: 'Often — clear engagement with some things they used to love', score: 3 },
      { label: 'Yes — their engagement with the world is largely intact', score: 4 },
    ],
    weight: 1.25
  },
  {
    dimension: 'Happiness and connection',
    question: 'Does your pet still seek connection with you?',
    context: 'This includes: moving toward you when you enter the room, accepting touch without pulling away, making eye contact, settling near you by choice.',
    options: [
      { label: 'No — they withdraw from contact or seem indifferent to my presence', score: 0 },
      { label: 'Rarely — occasional moments of connection but largely withdrawn', score: 1 },
      { label: 'Sometimes — some connection, but less than their normal self', score: 2 },
      { label: 'Often — they still seek me out and accept closeness', score: 3 },
      { label: 'Yes — our connection feels largely unchanged', score: 4 },
    ],
    weight: 1.25
  },
  {
    dimension: 'Overall pattern',
    question: 'Over the past two weeks, how would you describe the balance of difficult days versus comfortable ones?',
    context: 'A difficult day is one where your pet appeared to be suffering, struggling, or disengaged. A comfortable day is one where they seemed at ease, engaged, or like themselves.',
    options: [
      { label: 'Almost all difficult days — comfortable moments are rare', score: 0 },
      { label: 'More difficult than comfortable — the trend is clearly downward', score: 1 },
      { label: 'Roughly equal — hard to say which direction things are going', score: 2 },
      { label: 'More comfortable than difficult — there are still good days', score: 3 },
      { label: 'Mostly comfortable days — the difficult moments are the exception', score: 4 },
    ],
    weight: 1.5
  },
  {
    dimension: 'Overall pattern',
    question: 'Compared to one month ago, how is your pet doing?',
    context: 'This question asks about trajectory, not current state. A pet who is stable at a reduced level is different from one who is continuing to decline.',
    options: [
      { label: 'Much worse — the decline has been significant and sustained', score: 0 },
      { label: 'Noticeably worse — a clear downward trend', score: 1 },
      { label: 'Somewhat worse — declining but not dramatically', score: 2 },
      { label: 'About the same — stable, even if not ideal', score: 3 },
      { label: 'The same or better — no significant decline over the past month', score: 4 },
    ],
    weight: 1.25
  },
  {
    dimension: 'Overall pattern',
    question: 'When you imagine your pet a month from now on the current trajectory, what do you see?',
    context: 'This is a forward-looking question about where things appear to be heading based on what you\'ve been observing.',
    options: [
      { label: 'I believe they will be suffering significantly', score: 0 },
      { label: 'I expect things will be notably harder for them', score: 1 },
      { label: 'I\'m not sure — it\'s hard to predict', score: 2 },
      { label: 'I think they may be stable or the decline will be slow', score: 3 },
      { label: 'I expect things to remain much as they are now', score: 4 },
    ],
    weight: 1
  },
  {
    dimension: 'Your sense of it',
    question: 'Setting aside what you think you should feel — what does your gut tell you about how your pet is doing right now?',
    context: 'Owners know their animals. Research consistently shows that owners are accurate observers of their pet\'s wellbeing. This question is not a trick. Your instinct is a meaningful data point.',
    options: [
      { label: 'My gut tells me they are suffering and that things are very hard for them', score: 0 },
      { label: 'Something feels significantly wrong — this is not okay for them', score: 1 },
      { label: 'I\'m genuinely uncertain — I can see it both ways', score: 2 },
      { label: 'I think they\'re coping, even if things aren\'t easy', score: 3 },
      { label: 'My gut tells me they are still okay — still themselves', score: 4 },
    ],
    weight: 1.5
  },
  {
    dimension: 'Your sense of it',
    question: 'When you picture what your pet would want, if they could tell you, what do you believe that would be?',
    context: 'This is the hardest question in the assessment. There is no right answer. It is here because many owners find that, once they sit with it, they already know.',
    options: [
      { label: 'I believe they would want this to be over — they are ready', score: 0 },
      { label: 'I think they may be ready, even if I am not', score: 1 },
      { label: 'I genuinely don\'t know', score: 2 },
      { label: 'I think they still have some time left that is worth living', score: 3 },
      { label: 'I believe they still want to be here — they are not ready', score: 4 },
    ],
    weight: 1.5
  }
];

var currentStep = 0;
var answers = new Array(toolQuestions.length).fill(null);

function buildTool() {
  var container = document.getElementById('toolSteps');
  if (!container) return;
  container.innerHTML = '';

  toolQuestions.forEach(function (q, i) {
    var step = document.createElement('div');
    step.className = 'tool-step' + (i === 0 ? ' active' : '');
    step.id = 'step-' + i;
    step.setAttribute('role', 'group');
    step.setAttribute('aria-label', q.dimension + ': question ' + (i + 1) + ' of ' + toolQuestions.length);

    var optionsHTML = q.options.map(function (opt, j) {
      var isSelected = answers[i] === j;
      return '<li>' +
        '<button class="tool-option' + (isSelected ? ' selected' : '') + '" ' +
        'role="radio" ' +
        'aria-checked="' + (isSelected ? 'true' : 'false') + '" ' +
        'data-step="' + i + '" data-option="' + j + '" ' +
        'onclick="selectOption(' + i + ',' + j + ')">' +
        '<span class="tool-option-indicator" aria-hidden="true"></span>' +
        '<span class="tool-option-text">' + opt.label + '</span>' +
        '</button>' +
        '</li>';
    }).join('');

    step.innerHTML =
      '<span class="tool-dimension-label" aria-hidden="true">' + q.dimension + '</span>' +
      '<div class="tool-question" id="q-' + i + '">' + q.question + '</div>' +
      '<div class="tool-context">' + q.context + '</div>' +
      '<ul class="tool-options" role="radiogroup" aria-labelledby="q-' + i + '">' +
      optionsHTML +
      '</ul>';

    container.appendChild(step);
  });

  updateProgress();
  updateNav();
}

function selectOption(stepIndex, optionIndex) {
  answers[stepIndex] = optionIndex;

  var stepEl = document.getElementById('step-' + stepIndex);
  if (!stepEl) return;

  stepEl.querySelectorAll('.tool-option').forEach(function (el, i) {
    var selected = (i === optionIndex);
    el.classList.toggle('selected', selected);
    el.setAttribute('aria-checked', selected ? 'true' : 'false');
  });

  var nextBtn = document.getElementById('btnNext');
  if (nextBtn) nextBtn.disabled = false;
}

function updateProgress() {
  var pct = (currentStep / toolQuestions.length) * 100;
  var fill = document.getElementById('progressFill');
  var label = document.getElementById('progressLabel');
  if (fill) fill.style.width = Math.round(pct) + '%';
  if (label) {
    label.textContent = 'Question ' + (currentStep + 1) + ' of ' + toolQuestions.length;
  }
  var wrap = document.getElementById('toolWrap');
  if (wrap) {
    wrap.setAttribute('aria-label', 'Quality of life assessment, question ' + (currentStep + 1) + ' of ' + toolQuestions.length);
  }
}

function updateNav() {
  var backBtn = document.getElementById('btnBack');
  var nextBtn = document.getElementById('btnNext');
  if (backBtn) backBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
  if (nextBtn) {
    nextBtn.textContent = currentStep === toolQuestions.length - 1 ? 'See my results' : 'Continue';
    nextBtn.disabled = answers[currentStep] === null;
  }
}

function toolNext() {
  if (answers[currentStep] === null) return;
  if (currentStep === toolQuestions.length - 1) {
    showResults();
    return;
  }
  document.getElementById('step-' + currentStep).classList.remove('active');
  currentStep++;
  document.getElementById('step-' + currentStep).classList.add('active');
  updateProgress();
  updateNav();
  var wrap = document.getElementById('toolWrap');
  if (wrap) wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // Move focus to question heading for screen readers
  var qEl = document.getElementById('q-' + currentStep);
  if (qEl) { qEl.setAttribute('tabindex', '-1'); qEl.focus(); }
}

function toolBack() {
  if (currentStep === 0) return;
  document.getElementById('step-' + currentStep).classList.remove('active');
  currentStep--;
  document.getElementById('step-' + currentStep).classList.add('active');
  updateProgress();
  updateNav();
  var qEl = document.getElementById('q-' + currentStep);
  if (qEl) { qEl.setAttribute('tabindex', '-1'); qEl.focus(); }
}

function calculateScore() {
  var total = 0, maxTotal = 0;
  var byDimension = {};
  toolQuestions.forEach(function (q, i) {
    var score = answers[i] !== null ? q.options[answers[i]].score : 0;
    var weighted = score * q.weight;
    var maxWeighted = 4 * q.weight;
    total += weighted;
    maxTotal += maxWeighted;
    if (!byDimension[q.dimension]) byDimension[q.dimension] = { score: 0, max: 0 };
    byDimension[q.dimension].score += weighted;
    byDimension[q.dimension].max += maxWeighted;
  });
  return { pct: Math.round((total / maxTotal) * 100), byDimension: byDimension };
}

function showResults() {
  var toolWrap = document.getElementById('toolWrap');
  var results = document.getElementById('toolResults');
  if (!results) return;
  if (toolWrap) toolWrap.style.display = 'none';
  results.classList.add('active');
  results.style.display = 'block';

  var data = calculateScore();
  var pct = data.pct;
  var byDimension = data.byDimension;

  var bandClass, bandLabel, bandTitle, bandText, nextSteps;

  if (pct >= 65) {
    bandClass = 'band-1';
    bandLabel = 'Monitoring closely';
    bandTitle = 'Quality of life appears stable for now.';
    bandText = 'Based on what you\'ve described, your pet is experiencing some challenges but is managing day to day. This is a good time to establish a baseline with your vet, begin tracking daily observations, and prepare yourself — practically and emotionally — for what may come. Reassess in one to two weeks, or sooner if things change.';
    nextSteps = [
      'Print the daily quality of life scorecard and begin tracking — one entry per day.',
      'Schedule a quality of life conversation with your vet if you haven\'t already.',
      'Download the questions to ask your vet checklist and bring it to your next appointment.',
      'Reassess with this tool in one to two weeks.'
    ];
  } else if (pct >= 35) {
    bandClass = 'band-2';
    bandLabel = 'The window is narrowing';
    bandTitle = 'Several dimensions are showing significant strain.';
    bandText = 'Based on what you\'ve described, your pet is experiencing difficulty across multiple areas of their daily life. This is a meaningful signal. It does not tell you exactly when, but it does suggest that this is a good time to have specific conversations with your vet, begin making practical arrangements, and spend unhurried time with your pet.';
    nextSteps = [
      'Schedule a dedicated quality of life appointment with your vet — a focused conversation, not a routine visit.',
      'Download the planning checklist and begin working through it at your own pace.',
      'Research in-home euthanasia options in your area. <a href="#affiliate-lap-of-love" class="affiliate-link" rel="sponsored noopener" target="_blank">Lap of Love</a> operates in most US cities and allows online booking.',
      'Consider whether the people who love your pet have had a chance to say goodbye.'
    ];
  } else {
    bandClass = 'band-3';
    bandLabel = 'Your pet is telling you something';
    bandTitle = 'Based on what you\'ve described, your pet is experiencing significant diminishment.';
    bandText = 'Across nearly every dimension you\'ve described, your pet is struggling. Many owners in this situation find that acting sooner rather than later is the kindest choice — not because more time isn\'t precious, but because their pet\'s experience of that time matters deeply. You know your animal. If your gut has been telling you something, it is worth listening to.';
    nextSteps = [
      'Call your vet today to discuss what you\'ve observed.',
      'Look into in-home euthanasia options now, while you have a moment to think. <a href="#affiliate-lap-of-love" class="affiliate-link" rel="sponsored noopener" target="_blank">Lap of Love</a> operates in most US cities.',
      'Download the planning checklist. Working through it now, while you have time, is easier than in the hours before.',
      'You do not have to do this alone. Tell the people who love your pet what is happening.'
    ];
  }

  var bandEl = document.getElementById('resultBand');
  if (bandEl) {
    bandEl.innerHTML =
      '<div class="result-band ' + bandClass + '" role="status" aria-live="polite">' +
      '<span class="result-band-label">' + bandLabel + '</span>' +
      '<h3>' + bandTitle + '</h3>' +
      '<p>' + bandText + '</p>' +
      '</div>';
  }

  var breakdownEl = document.getElementById('scoreBreakdown');
  if (breakdownEl) {
    breakdownEl.innerHTML = Object.entries(byDimension).map(function (entry) {
      var dim = entry[0], data = entry[1];
      var dimPct = Math.round((data.score / data.max) * 100);
      return '<div class="result-score-row">' +
        '<span class="result-score-name">' + dim + '</span>' +
        '<div class="result-score-bar-wrap" role="progressbar" aria-valuenow="' + dimPct + '" aria-valuemin="0" aria-valuemax="100" aria-label="' + dim + ' score">' +
        '<div class="result-score-bar" style="width:' + dimPct + '%"></div>' +
        '</div>' +
        '<span class="result-score-val">' + dimPct + '%</span>' +
        '</div>';
    }).join('');
  }

  var nextEl = document.getElementById('resultNext');
  if (nextEl) {
    nextEl.innerHTML =
      '<h4>Suggested next steps</h4>' +
      '<ul>' + nextSteps.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>';
  }

  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // Move focus to result heading
  var resultHeading = results.querySelector('h3');
  if (resultHeading) { resultHeading.setAttribute('tabindex', '-1'); resultHeading.focus(); }
}

function restartTool() {
  currentStep = 0;
  answers = new Array(toolQuestions.length).fill(null);
  var results = document.getElementById('toolResults');
  var toolWrap = document.getElementById('toolWrap');
  if (results) { results.classList.remove('active'); results.style.display = 'none'; }
  if (toolWrap) { toolWrap.style.display = 'block'; }
  buildTool();
  if (toolWrap) toolWrap.scrollIntoView({ behavior: 'smooth' });
}

// Init tool if present on page
if (document.getElementById('toolSteps')) {
  buildTool();
}
