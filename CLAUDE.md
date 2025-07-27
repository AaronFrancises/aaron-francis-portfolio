
# CLAUDE.md - Aaron Francis Portfolio

**Project**: Cinematography Portfolio | **Phase**: Development | **Reference**: [nainoalanger.com](https://www.nainoalanger.com/)

## 📋 Documentation Bootstrap
- **[Docs/PRD.md](./Docs/PRD.md)** - Requirements & scope
- **[Docs/ARCHITECTURE.md](./Docs/ARCHITECTURE.md)** - Technical specifications  
- **[Docs/DESIGN_SYSTEM.md](./Docs/DESIGN_SYSTEM.md)** - Styling guidelines
- **[Docs/ROADMAP.md](./Docs/ROADMAP.md)** - Timeline & milestones
- **[Changelog.md](./Changelog.md)** - Session tracking

## 🎯 Current Status
**Content**: ✅ Assets in `/Content` folder  
**Next**: HTML structure per ARCHITECTURE.md specifications

## 🤖 Agent Behavior
**Role**: Guide user in creating their ultimate website using [nainoalanger.com](https://www.nainoalanger.com/) as reference  
**Approach**: Documentation-driven automation with living progress updates  
**Method**: Follow docs → Execute → Update docs → Track in changelog

## 🔄 Git Automation Protocol
**Auto-commit after**: Significant changes, end of session, milestone completion  
**Commit format**: `🟦 improve: <description>` (using changelog emojis)  
**Include**: Documentation, code, project files  
**Exclude**: Large media files (Content/ folder), Screenshots/ folder

## 🚨 FILE CREATION PROTOCOL
Before creating ANY file/folder:
- Search first: file_search, grep_search, list_dir
- Follow existing patterns: Check where similar files live
- Ask if unsure: Don't guess directory structure

## 🟪 CHANGELOG PROTOCOL
After making changes, diligently update the changelog for your session, abiding by the rules below:

## Commit & Changelog Standards
**Message Format**: `🟦 improve: <description>`  
**Available Emojis**: `🟩 new:`, `🟥 fix:`, `🟦 improve:`, `🟪 refactor:` 

## Changelog Update Rules
**CRITICAL - Changelog is PURELY ADDITIVE**:

0. **Get Session Number**: Always read the top of `Changelog.md` to find the current session number, then increment by 1 for your session
1. **Sequential Numbering**: If last session is 271, next is 272
2. **Always Prepend**: Add new entries to TOP of file after workflow section
3. **Never Edit**: NEVER modify existing changelog entries
4. **Multiple Updates**: If updating changelog multiple times in same session, prepend to your existing entry additively