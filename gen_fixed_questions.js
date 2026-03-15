#!/usr/bin/env node
/**
 * Generate fixed question pools from procedural generators.
 * Runs each skill's gen(level) many times, deduplicates by text,
 * and outputs a JSON file with all unique questions.
 */
const fs = require('fs')
const path = require('path')

// Helper functions (from engine.js)
function R(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function SH(a){for(var i=a.length-1;i>0;i--){var j=R(0,i);var t=a[i];a[i]=a[j];a[j]=t}return a}
function MQ(text,ans,hint,opts){
  if(typeof ans==='number'){
    ans=parseInt(ans);if(isNaN(ans))ans=0;
    if(!opts){
      var s=[ans];var _safe=0;
      while(s.length<4&&_safe<200){_safe++;var d=R(1,Math.max(3,Math.abs(Math.round(ans*.3))||3));if(Math.random()>.5)d=-d;var v=ans+d;if(v>=0&&v!==ans&&s.indexOf(v)===-1)s.push(v)}
      while(s.length<4)s.push(ans+s.length*7);
      opts=SH(s);
    }
    return{text:text,answer:ans,hint:hint||'',options:opts,isText:false}
  }
  return{text:text,answer:ans,hint:hint||'',options:opts||[ans],isText:true}
}
function TQ(text,correctStr,wrongStrs,hint){
  var opts=SH([correctStr].concat(wrongStrs).slice(0,4));
  return{text:text,answer:correctStr,hint:hint||'',options:opts,isText:true}
}

const GRADES = ['lop1','lop2','lop3','lop4','lop5']
const QUESTIONS_PER_LEVEL = 30
const GEN_ATTEMPTS = 500
const MAX_LEVEL = 5

const allPools = {}

for (const grade of GRADES) {
  const filePath = path.join(__dirname, 'public', 'grades', `${grade}.js`)
  const code = fs.readFileSync(filePath, 'utf-8')

  try {
    // Create a sandbox with required globals
    const sandbox = { R, SH, MQ, TQ, Math, parseInt, isNaN, String, Number, Array, Object, console, JSON }
    const wrappedCode = `
      var window = {};
      ${code}
      return window.GRADE_CONFIG;
    `
    const fn = new Function(...Object.keys(sandbox), wrappedCode)
    const gradeConfig = fn(...Object.values(sandbox))

    if (!gradeConfig || !gradeConfig.subjects) {
      console.error(`No GRADE_CONFIG.subjects in ${grade}`)
      continue
    }

    console.log(`\n${grade}: ${gradeConfig.subjects.length} subjects`)

    for (const sub of gradeConfig.subjects) {
      for (const skill of sub.skills) {
        const pool = {}

        for (let level = 1; level <= MAX_LEVEL; level++) {
          const questions = []
          const seen = new Set()

          for (let attempt = 0; attempt < GEN_ATTEMPTS; attempt++) {
            try {
              const q = skill.gen(level)
              if (q && q.text && !seen.has(q.text)) {
                seen.add(q.text)
                questions.push({
                  t: q.text,
                  a: q.answer,
                  h: q.hint || '',
                  x: q.isText ? 1 : 0
                })
                if (questions.length >= QUESTIONS_PER_LEVEL) break
              }
            } catch(e) {}
          }

          if (questions.length > 0) {
            pool[level] = questions
          }
        }

        const totalQ = Object.values(pool).reduce((s,arr) => s + arr.length, 0)
        if (totalQ > 0) {
          allPools[skill.id] = pool
          console.log(`  ${skill.id}: ${totalQ} q (${Object.keys(pool).map(l => `L${l}:${pool[l].length}`).join(' ')})`)
        }
      }
    }
  } catch(e) {
    console.error(`Error in ${grade}:`, e.message)
  }
}

// Write output
const outputPath = path.join(__dirname, 'public', 'questions_pool.json')
fs.writeFileSync(outputPath, JSON.stringify(allPools))

// Stats
const totalSkills = Object.keys(allPools).length
const totalQuestions = Object.values(allPools).reduce((s, pool) =>
  s + Object.values(pool).reduce((s2, arr) => s2 + arr.length, 0), 0)

console.log(`\n=== DONE ===`)
console.log(`Skills: ${totalSkills}`)
console.log(`Total questions: ${totalQuestions}`)
console.log(`Output: ${outputPath}`)

// Extract all unique question texts for voice generation
const allTexts = new Set()
for (const pool of Object.values(allPools)) {
  for (const questions of Object.values(pool)) {
    for (const q of questions) {
      allTexts.add(q.t)
    }
  }
}
const textsPath = path.join(__dirname, 'question_texts.json')
fs.writeFileSync(textsPath, JSON.stringify([...allTexts]))
console.log(`Unique texts: ${allTexts.size}`)
console.log(`Texts file: ${textsPath}`)
